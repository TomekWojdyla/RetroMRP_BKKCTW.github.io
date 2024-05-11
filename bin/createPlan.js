//creates production plan from existing schematic in form of a "jsonFulfillment"
//jsonFulfillment['status'] stores control value: 
//'in-planning' - generation not finilized, 
//'unachievable' - can't generate proper data from current data set, 
//'in-realization' - generation finished with success
function createPlan(){
    window.open('result.html');
    let schematic = JSON.parse(localStorage.getItem("productSchematic"));
    let order = JSON.parse(localStorage.getItem("productOrder"));
    let stock = JSON.parse(localStorage.getItem("productStock"));

    //TODO proper front error handling
    if (schematic == null) {
        console.log("No valid productSchematic!");
    } else if(order == null) {
        console.log("No valid productOrder!");
    } else {

        let fulfillmentTime = order['time'];

        let jsonFulfillment = {};
        jsonFulfillment['status'] = "in-planning";

        let orderID = 1;

        //creates order sequentially
        //L0
        productionStartL0 = fulfillmentTime - schematic['productionTime'];
        if (productionStartL0 < 0) {
            jsonFulfillment = {};
            jsonFulfillment['status'] = 'unachievable';
        } else {
            storageBefore = stock['L0']['quantity'];
            quantityL0 = checkStock(stock,'L0', order['quantity']);
            if(storageBefore != stock['L0'] && stock['L0']['quantity']>0) {productionStartL0 = fulfillmentTime};
            submitOrder(jsonFulfillment, orderID, 'L0', schematic['name'], productionStartL0, fulfillmentTime, order['quantity'], quantityL0, storageBefore, stock['L0']['quantity']);
            //L1
            if(quantityL0 > 0) {
                for(i=1; i <=3; i++) {
                    if (typeof schematic[`SubitemL1_${i}`] != "undefined" && jsonFulfillment['status'] != 'unachievable') {
                        productionStartL1 = productionStartL0 - schematic[`SubitemL1_${i}`]['productionTime'];
                        if (productionStartL1 < 0) {
                            jsonFulfillment = {};
                            jsonFulfillment['status'] = 'unachievable';
                        } else {
                            storageBefore = stock[`L1-${i}`]['quantity'];
                            orderQuantity = quantityL0 * schematic[`SubitemL1_${i}`]['quantity']
                            quantityL1 = checkStock(stock, `L1-${i}`, orderQuantity);
                            if(stock[`L1-${i}`]['quantity'] != storageBefore && stock[`L1-${i}`]['quantity']>0) productionStartL1 = productionStartL0;
                            submitOrder(jsonFulfillment, ++orderID, `L1-${i}`, schematic[`SubitemL1_${i}`]['name'], productionStartL1, productionStartL0, orderQuantity, quantityL1, storageBefore, stock[`L1-${i}`]['quantity']);
                            //L2
                            if(quantityL1 > 0) {
                                for(j=1; j <=3; j++) {
                                    if (typeof schematic[`SubitemL1_${i}`][`SubitemL2_${i}_${j}`] != "undefined" && jsonFulfillment['status'] != 'unachievable') {
                                        productionStartL2 = productionStartL1 - schematic[`SubitemL1_${i}`][`SubitemL2_${i}_${j}`]['productionTime'];
                                        if (productionStartL2 < 0) {
                                            jsonFulfillment = {};
                                            jsonFulfillment['status'] = 'unachievable';
                                        } else {
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
            }
        }
        if (jsonFulfillment['status'] != 'unachievable') {
            jsonFulfillment['status'] = 'in-realization';
        }
        localStorage.setItem("fulfillmentPlan",JSON.stringify(jsonFulfillment));
        if(stock != null && jsonFulfillment['status'] != 'unachievable') localStorage.setItem("productStock",JSON.stringify(stock));
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
