'use strict';

//MRP BUTTONS SCRIPT

//Reload Page with 'Start again' button
document.querySelector('.again').addEventListener('click', function () {
  location.reload();
  product_json = {};
  editFields = [];
});

let product_json = {};
let editFields = [];

//Add Product - alternative route (create elements)
document.querySelector('#add-product-btn').addEventListener('click', function () {
  document.querySelector('#add-product-btn').style.visibility = 'hidden';
  document.querySelector('#save-product-btn').style.visibility = 'visible';
  document.querySelector("#product-input").innerHTML = 
  `<div class = "input-section-content-L0">
  <h1>L0:</h1>
  <p>
    Product name <span><input class = "product_L0" id = "L0-name" value = ""/></span>
  </p>
  <p>
    Production time<span><input type = "number" class = "product_L0" id = "L0-production-time" /></span>
  </p>
  <button class="btn" id="add-L1" onclick = "addSubitemL1()">Add sub-item (L1) - Max (3)</button>
  </div>
  <div id = "L1-input"></div>`;
 if (product_json != {}) {
  document.querySelector('#L0-name').defaultValue = product_json['productName'];
  document.querySelector('#L0-production-time').defaultValue = product_json['productProductionTime'];
 };
});

let subitmesL1Count = 0;
let subitemsL2Count = {};

//Add subitems L1
function addSubitemL1() {
  if (subitmesL1Count<3) {
  subitmesL1Count += 1;
  subitemsL2Count[subitmesL1Count] = 0;
  const currentSubitemStructure = document.querySelector("#L1-input").outerHTML
  const newSubitemStructure = 
  `<div class = "input-section-content-L1" id = "L1_${subitmesL1Count}-input">
  <h2>L1:${subitmesL1Count}</h2>
  <p>
    Product name <span><input class="product_L0" id="L1_${subitmesL1Count}-name" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" id="L1_${subitmesL1Count}-quantity" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" id="L1_${subitmesL1Count}-production-time" /></span>
  </p>
  <button class="btn" id="add-L2-${subitmesL1Count}" onclick = "addSubitemL2(${subitmesL1Count})">Add subitem (L2) - Max (3)</button>
  </div>
  <div id = "L${subitmesL1Count}-2-input"></div>`;
  const fullSubitemStructure = currentSubitemStructure + newSubitemStructure
  document.querySelector("#L1-input").innerHTML = fullSubitemStructure
  };
  if (subitmesL1Count===3) {
    document.querySelector("#add-L1").innerHTML = `MAX subitems added!`
  };
  console.log(subitmesL1Count)
};


//Add subitems L2
function addSubitemL2(L1ItemNumber) {
  if (subitemsL2Count[L1ItemNumber]<3) {
  subitemsL2Count[L1ItemNumber] += 1;
  const currentSubitemStructure = document.querySelector(`#L${L1ItemNumber}-2-input`).outerHTML
  const newSubitemStructure = 
  `<div class = "input-section-content-L2" id = "L2_${L1ItemNumber}_${subitemsL2Count[L1ItemNumber]}-input">
  <h3>L2:${L1ItemNumber}.${subitemsL2Count[L1ItemNumber]}</h3>
  <p>
    Product name <span><input class="product_L0" id="L2_${L1ItemNumber}_${subitemsL2Count[L1ItemNumber]}-name" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" id="L2_${L1ItemNumber}_${subitemsL2Count[L1ItemNumber]}-quantity" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" id="L2_${L1ItemNumber}_${subitemsL2Count[L1ItemNumber]}-production-time" /></span>
  </p>
  </div>`;
  const fullSubitemStructure = currentSubitemStructure + newSubitemStructure
  document.querySelector(`#L${L1ItemNumber}-2-input`).innerHTML = fullSubitemStructure
  };
  if (subitemsL2Count[L1ItemNumber]===3) {
    document.querySelector(`#add-L2-${L1ItemNumber}`).innerHTML = `MAX subitems added!`
  };
};


//save product and display its structure
document.querySelector('#save-product-btn').addEventListener('click', function () {
  product_json['productName'] = document.querySelector('#L0-name').value;
  product_json['productProductionTime'] = Number(document.querySelector('#L0-production-time').value);
  editFields.push(product_json['productName']);
  editFields.push(product_json['productProductionTime']);
  console.log(editFields);

  let productStructure = document.getElementById('product-structure');
  let productStructureText = '';
  let L0 = `<div class = "list-L0">
  <p class="text-OK">Product saved succesfully!</p>
  <p>Product L0:</p>
  <li>Product Name: ${product_json['productName']} </li>
  <li>Production/Assembly Time: ${product_json['productProductionTime']} day(s) </li>
  </div>`;

  let subItemsL1 = ``;

    for (let i = 1; i < subitmesL1Count+1; i++) {
      let nextIDName = `#L1_${i}-name`;
      let nextSubitemName = document.querySelector(nextIDName).value;
      let nextIDQuantity = `#L1_${i}-quantity`;
      let nextSubitemQuantity = document.querySelector(nextIDQuantity).value;
      let nextIDProductionTime = `#L1_${i}-production-time`;
      let nextSubitemProductionTime = document.querySelector(nextIDProductionTime).value;
      let newSubitem = `<div class = "list-L1">
      <p>L1: Subitem ${i}</p> 
      <li>     Product Name: ${nextSubitemName}</li> 
      <li>     Quantity: ${nextSubitemQuantity}</li>
      <li>     Production Time: ${nextSubitemProductionTime} day(s)</li>
      </div>`;
      subItemsL1 += newSubitem;

      //Extending Product JSON with subitems
      let jsonKeyL1 = `SubitemL1_${i}`;
      let jsonValueL1 = {};
      product_json[jsonKeyL1] = {};
      jsonValueL1['L1SubitemName'] = nextSubitemName;
      jsonValueL1['L1SubitemQuantity'] = Number(nextSubitemQuantity);
      jsonValueL1['L1SubitemProductionTime'] = Number(nextSubitemProductionTime);
      // jsonValueL1['SubitemL2_1_1']={}
      product_json[jsonKeyL1] = jsonValueL1;

      //Listing L2 subitems
      let subItemsL2 = ``;
      for (let j = 1; j < subitemsL2Count[i]+1; j++) {
        let nextL2IDName = `#L2_${i}_${j}-name`;
        let nextL2SubitemName = document.querySelector(nextL2IDName).value;
        let nextL2IDQuantity = `#L2_${i}_${j}-quantity`;
        let nextL2SubitemQuantity = document.querySelector(nextL2IDQuantity).value;
        let nextL2IDProductionTime = `#L2_${i}_${j}-production-time`;
        let nextL2SubitemProductionTime = document.querySelector(nextL2IDProductionTime).value;
        let newL2Subitem = `<div class = "list-L2">
        <p>L2: Subitem ${i}.${j}</p> 
        <li>     Product Name: ${nextL2SubitemName}</li> 
        <li>     Quantity: ${nextL2SubitemQuantity}</li>
        <li>     Production Time: ${nextL2SubitemProductionTime} day(s)</li>
        </div>`;
        subItemsL2 += newL2Subitem;

        //Extending Product JSON with subitems L2 for (i) Subitem L1
        let jsonKeyL2 = `SubitemL2_${i}_${j}`;
        let jsonValueL2 = {};
        jsonValueL2['L2SubitemName'] = nextL2SubitemName;
        jsonValueL2['L2SubitemQuantity'] = Number(nextL2SubitemQuantity);
        jsonValueL2['L2SubitemProductionTime'] = Number(nextL2SubitemProductionTime);
        // console.log(jsonValueL2)
        product_json[jsonKeyL1][jsonKeyL2] = jsonValueL2;
      };
      subItemsL1 += subItemsL2

    };
  
  //Reaction to nulls in product definition - smth not working yet
  // if ((0 in editFields)) {
  //   productStructure.innerHTML = `<p class = "text-error">Some fields were left empty. Please start again.</p>`
  // } else {
    productStructure.innerHTML = productStructureText + L0 + subItemsL1;
    document.querySelector('#add-product-btn').style.visibility = 'visible';
    document.querySelector('#add-product-btn').innerHTML = 'Edit product';
    document.querySelector('#add-product-btn').style.backgroundColor = '#e6b400';
  // };

  //Visibility actions upon save event
  document.querySelector('#save-product-btn').style.visibility = 'hidden';
  document.querySelector('.input-section-content-L0').style.visibility = 'hidden';
  document.querySelector("#product-input").innerHTML = ``;
  console.log(product_json);
});


// Adding order for L0 product
function addOrder() {
  document.querySelector('#save-order-btn').style.visibility = 'visible';
  document.querySelector('#add-order-btn').style.visibility = 'hidden';
  document.querySelector('#input-order').innerHTML = `
  <p>Place order for L0 products: </p>
  <p>
  Quantity (ea.)<span><input type="number" class="product_L0" id = "order-quantity" value=""/></span>
  </p>`;
  if (L0ProductOrder) {
    document.querySelector('#order-quantity').defaultValue = L0ProductOrder;
  }
};

let L0ProductOrder = 0;
//Saving Product Order
function saveOrder() {
  L0ProductOrder = Number(document.querySelector(`#order-quantity`).value);
  document.querySelector('#input-order').innerHTML = `Order: ${L0ProductOrder} ea. of L0 Product`;
  document.querySelector('#save-order-btn').style.visibility = 'hidden';
  document.querySelector('#add-order-btn').style.visibility = 'visible';
  document.querySelector('#add-order-btn').style.backgroundColor = '#e6b400';
  document.querySelector('#add-order-btn').innerHTML = 'Edit order';
  console.log(L0ProductOrder);
}
