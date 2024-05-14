//creates production plan from existing schematic in form of a "jsonFulfillment"
//jsonFulfillment['status'] stores control value: 
//'in-planning' - generation not finilized, 
//'unachievable' - can't generate proper data from current data set, 
//'in-realization' - generation finished with success
//jsonFulfillment[orderID] fields:
//type                  -   product level
//name                  -   product name
//productionStart       -   time of starting the production
//productionCompletion  -   time of having products ready
//quantityToSend        -   quantity of products for an order completion
//quantityToProduce     -   quantity of products to actually produce
//storageBefore         -   quantity of products in stock before completing an order
//storageAfter          -   quantity of products in stock after completing an order

function createPlan(){
    //loading data
    let schematic = JSON.parse(localStorage.getItem("productSchematic"));
    let order = JSON.parse(localStorage.getItem("productOrder"));
    let stock = JSON.parse(localStorage.getItem("productStock"));

    //handling lack of data
    if (schematic == null) {
        document.getElementById("calculation-results").innerHTML = `
        <p class="text-error"><br>No valid product schematic!</p>`;
    } else if(order == null) {
        document.getElementById("calculation-results").innerHTML = `
        <p class="text-error"><br>No valid product order!</p>`;
    } else {
        //clearing errors and initializing new data json
        document.getElementById("calculation-results").innerHTML = ``;
        window.open('result.html');

        let jsonFulfillment = {};
        jsonFulfillment['status'] = "in-planning";

        let orderID = 1;
        let fulfillmentTime = order['time'];

        //getting mode, 0 - for no time give, 1 - for realization in time
        let mode = (order['time'] > 0 ? 1 : 0)

        if (mode) {
            //Mode 1: creates order sequentially in 2 nested for loops with the same algorithm
            
            //L0
            //checks time feasibility
            productionStartL0 = fulfillmentTime - schematic['productionTime'];
            //saves before-after stock values
            storageBefore = stock['L0']['quantity'];
            quantityL0 = checkStock(stock,'L0', order['quantity']);
            //adjust time if no need for production
            if(storageBefore != stock['L0']['quantity'] && stock['L0']['quantity']>0) {productionStartL0 = fulfillmentTime};
            //checks for time error, on success sends data and calls algorithm on another layer
            if (productionStartL0 < 0) {
                jsonFulfillment = {};
                jsonFulfillment['status'] = 'unachievable';
            } else {
                submitOrder(jsonFulfillment, orderID, 'L0', schematic['name'], productionStartL0, fulfillmentTime, order['quantity'], quantityL0, storageBefore, stock['L0']['quantity']);
                //L1
                if(quantityL0 > 0) {
                    for(i=1; i <=3; i++) {
                        //checks if subitem exists and if there is any need for going deeper
                        if (typeof schematic[`SubitemL1_${i}`] != "undefined" && jsonFulfillment['status'] != 'unachievable') {
                            productionStartL1 = productionStartL0 - schematic[`SubitemL1_${i}`]['productionTime'];
                            
                            storageBefore = stock[`L1-${i}`]['quantity'];
                            orderQuantity = quantityL0 * schematic[`SubitemL1_${i}`]['quantity']
                            quantityL1 = checkStock(stock, `L1-${i}`, orderQuantity);
                            if(stock[`L1-${i}`]['quantity'] != storageBefore && stock[`L1-${i}`]['quantity']>0) productionStartL1 = productionStartL0;
                            
                            if (productionStartL1 < 0) {
                                jsonFulfillment = {};
                                jsonFulfillment['status'] = 'unachievable';
                            } else {
                                submitOrder(jsonFulfillment, ++orderID, `L1-${i}`, schematic[`SubitemL1_${i}`]['name'], productionStartL1, productionStartL0, orderQuantity, quantityL1, storageBefore, stock[`L1-${i}`]['quantity']);
                                //L2
                                if(quantityL1 > 0) {
                                    for(j=1; j <=3; j++) {
                                        if (typeof schematic[`SubitemL1_${i}`][`SubitemL2_${i}_${j}`] != "undefined" && jsonFulfillment['status'] != 'unachievable') {
                                            productionStartL2 = productionStartL1 - schematic[`SubitemL1_${i}`][`SubitemL2_${i}_${j}`]['productionTime'];
                                            
                                            storageBefore = stock[`L2-${i}-${j}`]['quantity'];
                                            orderQuantity = quantityL1 * schematic[`SubitemL1_${i}`][`SubitemL2_${i}_${j}`]['quantity'];
                                            quantityL2 = checkStock(stock, `L2-${i}-${j}`, orderQuantity);
                                            if(stock[`L2-${i}-${j}`]['quantity'] != storageBefore && stock[`L2-${i}-${j}`]['quantity']>0) productionStartL2 = productionStartL1;
                                        
                                            if (productionStartL2 < 0) {
                                                jsonFulfillment = {};
                                                jsonFulfillment['status'] = 'unachievable';
                                            } else {
                                                submitOrder(jsonFulfillment, ++orderID, `L2-${i}-${j}`, schematic[`SubitemL1_${i}`][`SubitemL2_${i}_${j}`]['name'], productionStartL2, productionStartL1, orderQuantity, quantityL2, storageBefore, stock[`L2-${i}-${j}`]['quantity']);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            //Mode 2: creates realization plan estimate

            //gets minimal time possible
            minimalTime = (function getMinimalTime(schematic, name, level, quantityNeeded){
                let time = (stock[`L${level}${name}`]['quantity'] > quantityNeeded ? 0 : schematic['productionTime']);
                let i = 1;
                let maxTime = 0;
                let checkTime = 0;
                if (time > 0) {
                    for(key in schematic){
                        if (typeof schematic[key] == "object") checkTime = getMinimalTime(schematic[key], name+`-${i++}`, level+1, quantityNeeded - stock[`L${level}${name}`]['quantity']);
                        if (checkTime > maxTime) maxTime = checkTime;
                    }
                }
                return time+maxTime;
            })(schematic, '', 0, order['quantity']);
            
            //L0

            productionStartL0 = minimalTime - schematic['productionTime'];
            //saves before-after stock values
            storageBefore = stock['L0']['quantity'];
            quantityL0 = checkStock(stock,'L0', order['quantity']);
            //adjust time if no need for production
            if(storageBefore != stock['L0']['quantity'] && stock['L0']['quantity']>0) {productionStartL0 = fulfillmentTime};
            //checks for time error, on success sends data and calls algorithm on another layer
            submitOrder(jsonFulfillment, orderID, 'L0', schematic['name'], productionStartL0, minimalTime, order['quantity'], quantityL0, storageBefore, stock['L0']['quantity']);
            //L1
            if(quantityL0 > 0) {
                for(i=1; i <=3; i++) {
                    //checks if subitem exists and if there is any need for going deeper
                    if (typeof schematic[`SubitemL1_${i}`] != "undefined") {
                        productionStartL1 = productionStartL0 - schematic[`SubitemL1_${i}`]['productionTime'];
                            
                        storageBefore = stock[`L1-${i}`]['quantity'];
                        orderQuantity = quantityL0 * schematic[`SubitemL1_${i}`]['quantity']
                        quantityL1 = checkStock(stock, `L1-${i}`, orderQuantity);
                        if(stock[`L1-${i}`]['quantity'] != storageBefore && stock[`L1-${i}`]['quantity']>0) productionStartL1 = productionStartL0;  
                        
                        submitOrder(jsonFulfillment, ++orderID, `L1-${i}`, schematic[`SubitemL1_${i}`]['name'], productionStartL1, productionStartL0, orderQuantity, quantityL1, storageBefore, stock[`L1-${i}`]['quantity']);
                            //L2
                            if(quantityL1 > 0) {
                                for(j=1; j <=3; j++) {
                                    if (typeof schematic[`SubitemL1_${i}`][`SubitemL2_${i}_${j}`] != "undefined") {
                                        productionStartL2 = productionStartL1 - schematic[`SubitemL1_${i}`][`SubitemL2_${i}_${j}`]['productionTime'];
                                            
                                        storageBefore = stock[`L2-${i}-${j}`]['quantity'];
                                        orderQuantity = quantityL1 * schematic[`SubitemL1_${i}`][`SubitemL2_${i}_${j}`]['quantity'];
                                        quantityL2 = checkStock(stock, `L2-${i}-${j}`, orderQuantity);
                                        if(stock[`L2-${i}-${j}`]['quantity'] != storageBefore && stock[`L2-${i}-${j}`]['quantity']>0) productionStartL2 = productionStartL1;
                                            
                                        submitOrder(jsonFulfillment, ++orderID, `L2-${i}-${j}`, schematic[`SubitemL1_${i}`][`SubitemL2_${i}_${j}`]['name'], productionStartL2, productionStartL1, orderQuantity, quantityL2, storageBefore, stock[`L2-${i}-${j}`]['quantity']);
                                    }
                                }
                            }
                    }
                }
            }
        }

        if (jsonFulfillment['status'] != 'unachievable') {
            jsonFulfillment['status'] = 'in-realization';
        }
        localStorage.setItem("fulfillmentPlan",JSON.stringify(jsonFulfillment));
        //if(stock != null && jsonFulfillment['status'] != 'unachievable') localStorage.setItem("productStock",JSON.stringify(stock));
    } 
}

//appends new order to fulfillment json
function submitOrder(jsonToWrite, orderID, type, name, productionStart, productionEnd, quantityToSend, quantityToProduce, storageBefore, storageAfter){
    jsonToWrite[orderID] = {};
    jsonToWrite[orderID]['type'] = type;
    jsonToWrite[orderID]['name'] = name;
    jsonToWrite[orderID]['productionStart'] = productionStart;
    jsonToWrite[orderID]['productionCompletion'] = productionEnd;
    jsonToWrite[orderID]['quantityToSend'] = quantityToSend;
    jsonToWrite[orderID]['quantityToProduce'] = quantityToProduce;
    jsonToWrite[orderID]['storageBefore'] = storageBefore;
    jsonToWrite[orderID]['storageAfter'] = storageAfter;
}

//checks and reserves items from stock
function checkStock(stock, stockID, neededQuantity){
    if(stock != null){
        if ((stock[stockID]['quantity'] - neededQuantity) < 0) {
            neededQuantity -= stock[stockID]['quantity'];
            stock[stockID]['quantity'] = 0;
            return neededQuantity;
        } else {
            stock[stockID]['quantity'] -= neededQuantity;
            return 0;
        };
    } else return neededQuantity;
}
