// Retrieve plan data from local memory
const planData = JSON.parse(localStorage.getItem("fulfillmentPlan"));

// Function generates tables for each type
function genTables(fulfillmentPlan) {
    const planElement = document.getElementById("fulfillmentPlan");

    // Group orders by type
    const typeOrder = {};
    let maxDay = -Infinity;

    for (const orderId in fulfillmentPlan) {
        if (orderId !== "status") {
            const order = fulfillmentPlan[orderId];
            const type = order.type;
            if (!typeOrder[type]) {
                typeOrder[type] = [];
            }
            typeOrder[type].push(order);
            maxDay = Math.max(maxDay, order.productionCompletion)+1;
        }
    }
    console.log("Max production completion day:", maxDay);

    // Create a table for each type
    for (const type in typeOrder) {
        const orders = typeOrder[type];

        const table = document.createElement('table');
        const headerRow = table.insertRow();
        const daysCell = document.createElement('th');
        daysCell.textContent = "Days";
        headerRow.appendChild(daysCell);
        for (let i = 0; i <= maxDay-1; i++) {
            const header = document.createElement('th');
            header.textContent = `Day ${i}`;
            headerRow.appendChild(header);
        }

        // Quality to send values
        orders.forEach((order, index) => {
            if (index === 0) {
                const heading = document.createElement('h2');
                heading.textContent = `Type ${type}, Name: ${order.name}`;
                heading.className = 'types-heading';
                planElement.appendChild(heading);
            }
            const row = table.insertRow();
            for (let i = 0; i <= maxDay; i++) {
                const cell = row.insertCell();
                if (index === 0 && i === 0) {
                    cell.textContent = "Quantity to Send";
                } else if (i === order.productionCompletion+1) {
                    cell.textContent = order.quantityToSend; 
                } else {
                    cell.textContent = "";
                }
            }
        });

        // Quantity in stock values
        orders.forEach((order, index) => {
            const stockRow = table.insertRow();
            const row = stockRow;
            for (let i = 0; i <= maxDay; i++) {
                const cell = row.insertCell();
                if (index === 0 && i === 0) {
                    cell.textContent = "Quantity in Stock";
                } else if (i >= order.productionCompletion+1) {
                    cell.textContent = order.storageAfter;
                } else {
                    cell.textContent = order.storageBefore;
                }
            }
        });

        // Quantity to produce values
        orders.forEach((order, index) => {
            const produceRow = table.insertRow();
            const row = produceRow;
            for (let i = 0; i <= maxDay; i++) {
                const cell = row.insertCell();
                if (index === 0 && i === 0) {
                    cell.textContent = "Quantity to produce";
                } else if (i === order.productionStart+1) {
                    cell.textContent = order.quantityToProduce;
                } else {
                    cell.textContent = "";
                }
            }
        });

        // Append the table to theplan element
        planElement.appendChild(table);
    }
}

// Check if plan data exists
if (planData) {
    if (planData.status === 'in-realization') {
        // Call the function
        genTables(planData);
    } else if (planData.status === 'unachievable') {
        const planElement = document.getElementById("fulfillmentPlan");
        planElement.innerHTML = '<p class="unachievable-message">Order is unachievable.</p>';
        console.error("Fulfillment plan is unachievable.");
    }
} else {
    // Error message when no data is provided
    const planElement = document.getElementById("fulfillmentPlan");
    planElement.innerHTML = '<p class="error-message">Fulfillment plan data not found.</p>';
    console.error("Fulfillment plan data not found.");
}
    
