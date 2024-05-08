//creates production plan from existing schematic
function createPlan(){
    //mockData();
    let schematic = JSON.parse(localStorage.getItem("productSchematic"));
    let order = JSON.parse(localStorage.getItem("productOrder"));

    //TODO proper front error handling
    if (schematic == null) {
        console.log("No valid productSchematic!");
    } else if(order == null) {
        console.log("No valid productOrder!");
    } else {

        let fulfillmentTime = order['time'];
        let orderQuantity = order['quantity'];

        let jsonFulfillment = {};
        jsonFulfillment['Status'] = "in planning";

        let orderID = 1;

        //creates order sequentially
        //L0
        productionStartL0 = fulfillmentTime - schematic['productionTime'];
        if (productionStartL0 < 0) {
            jsonFulfillment = {};
            jsonFulfillment['status'] = 'unachievable';
        } else {
            newName = `L0-${[schematic['name']]}`;
            //TODO rework checkStock()
            quantityL0 = orderQuantity - checkStock(`L0-${[schematic['name']]}`);
            submitOrder(jsonFulfillment, orderID, newName, productionStartL0, quantityL0);
        //L1
            for(i=1; i <=3; i++) {
                if (typeof schematic[`SubitemL1_${i}`] != "undefined" && jsonFulfillment['status'] != 'unachievable') {
                    productionStartL1 = productionStartL0 - schematic[`SubitemL1_${i}`]['productionTime'];
                    if (productionStartL1 < 0) {
                        jsonFulfillment = {};
                        jsonFulfillment['status'] = 'unachievable';
                    } else {
                        quantityL1 = quantityL0 * schematic[`SubitemL1_${i}`]['quantity'] - checkStock(`L1-${schematic[`SubitemL1_${i}`]['Name']}`);
                        newName = `L1-${i}-${schematic[`SubitemL1_${i}`]['name']}`;
                        submitOrder(jsonFulfillment, ++orderID, newName, productionStartL1, quantityL1);
                        for(j=1; j <=3; j++) {
                            if (typeof schematic[`SubitemL1_${i}`][`SubitemL2_${i}_${j}`] != "undefined" && jsonFulfillment['status'] != 'unachievable') {
                                productionStartL2 = productionStartL1 - schematic[`SubitemL1_${i}`][`SubitemL2_${i}_${j}`]['productionTime'];
                                if (productionStartL2 < 0) {
                                    jsonFulfillment = {};
                                    jsonFulfillment['status'] = 'unachievable';
                                } else {
                                quantityL2 = quantityL1 * schematic[`SubitemL1_${i}`][`SubitemL2_${i}_${j}`]['quantity'] - checkStock(`L2-${schematic[`SubitemL1_${i}`]['Name']}`);
                                newName = `L2-${i}-${j}-${schematic[`SubitemL1_${i}`][`SubitemL2_${i}_${j}`]['name']}`;
                                submitOrder(jsonFulfillment, ++orderID, newName, productionStartL2, quantityL2);
                                }
                            }
                        }
                    }
                }
            }
        }
        if (jsonFulfillment['status'] != 'unachievable') {
            jsonFulfillment['status'] = 'in realization';
        }
        localStorage.setItem("fulfillmentPlan",JSON.stringify(jsonFulfillment));
    } 
}

//appends new order to fulfillment json
function submitOrder(jsonToWrite, orderID, name, productionStart, quantity){
    jsonToWrite[orderID] = {};
    jsonToWrite[orderID]['name'] = name;
    jsonToWrite[orderID]['productionStart'] = productionStart;
    jsonToWrite[orderID]['quantity'] = quantity;
}

//checks and reserves items from stock
function checkStock(itemName){
    return 0;
}

//creates testing set of data
function mockData(){
    //localStorage.setItem("productSchematic",'{"Name":"a","Type":"L0","ProductionTime":3,"SubitemL1_1":{"Name":"b","Type":"L1","Quantity":2,"ProductionTime":1,"SubitemL2_1_1":{"Name":"ba","Type":"L2","Quantity":4,"ProductionTime":1}, "SubitemL2_1_2":{"Name":"bb","Type":"L2","Quantity":2,"ProductionTime":5}},"SubitemL1_2":{"Name":"c","Type":"L1","Quantity":2,"ProductionTime":2,"SubitemL2_2_1":{"Name":"ca","Type":"L2","Quantity":2,"ProductionTime":1},"SubitemL2_2_2":{"Name":"cb","Type":"L2","Quantity":1,"ProductionTime":3}}}');
    localStorage.setItem("productSchematic",'{"Name":"a","Type":"L0","ProductionTime":3,"SubitemL1_1":{"Name":"b","Type":"L1","Quantity":2,"ProductionTime":1,"SubitemL2_1_1":{"Name":"ba","Type":"L2","Quantity":4,"ProductionTime":1}},"SubitemL1_2":{"Name":"c","Type":"L1","Quantity":2,"ProductionTime":2,"SubitemL2_2_1":{"Name":"ca","Type":"L2","Quantity":2,"ProductionTime":1},"SubitemL2_2_2":{"Name":"cb","Type":"L2","Quantity":1,"ProductionTime":3}}}');
    //localStorage.setItem("productSchematic",'{"Name":"a","Type":"L0","ProductionTime":3,"SubitemL1_1":{"Name":"b","Type":"L1","Quantity":2,"ProductionTime":1},"SubitemL1_2":{"Name":"c","Type":"L1","Quantity":2,"ProductionTime":2}}');
    localStorage.setItem("productOrder",'{"Quantity":4,"Time":12}');
}