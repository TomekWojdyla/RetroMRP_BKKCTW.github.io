'use strict';

//MRP BUTTONS SCRIPT

//Reload Page with 'Start again' button
document.querySelector('.again').addEventListener('click', function () {
  location.reload();
});

//display section of product data entry
document.querySelector('#add-product-btn').addEventListener('click', function () {
  document.querySelector('.product-details').style.visibility = 'visible';
  document.querySelector('#add-product-btn').style.visibility = 'hidden';
  document.querySelector('#save-product-btn').style.visibility = 'visible';
});

//add subitem L1_1
document.querySelector('#add-L1_1').addEventListener('click', function () {
  let newItem = document.getElementById('L1_1');
  newItem.innerHTML = `<h1>L1</h1>
  <p>
    Product name <span><input class="product_L0" id="L1_1-name"/></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" id="L1_1-quantity"/></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" id="L1_1-production-time"/></span>
  </p>
  <button class="btn" onclick ="L2_1_1()" id="add-L2_1_1">Add sub-item 1</button>
  <button class="btn" onclick ="L2_1_2()" id="add-L2_1_2">Add sub-item 2</button>
  <button class="btn" onclick ="L2_1_3()" id="add-L2_1_3">Add sub-item 3</button>`;
  document.querySelector('#add-L1_1').style.visibility = 'hidden';
});

//add subitem L2_1_1
function L2_1_1() {
  let newItem = document.getElementById('L2_1_1');
  newItem.innerHTML = `<h1>L2</h1>
  <p>
    Product name <span><input class="product_L0" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" /></span>
  </p>
  <button class="btn">No subitems allowed</button>`;
  document.querySelector('#add-L2_1_1').style.visibility = 'hidden';
}

//add subitem L2_1_2
function L2_1_2() {
  let newItem = document.getElementById('L2_1_2');
  newItem.innerHTML = `<h1>L2</h1>
  <p>
    Product name <span><input class="product_L0" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" /></span>
  </p>
  <button class="btn">No subitems allowed</button>`;
  document.querySelector('#add-L2_1_2').style.visibility = 'hidden';
}

//add subitem L2_1_3
function L2_1_3() {
  let newItem = document.getElementById('L2_1_3');
  newItem.innerHTML = `<h1>L2</h1>
  <p>
    Product name <span><input class="product_L0" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" /></span>
  </p>
  <button class="btn">No subitems allowed</button>`;
  document.querySelector('#add-L2_1_3').style.visibility = 'hidden';
}

//add subitem L1_2
document.querySelector('#add-L1_2').addEventListener('click', function () {
  let newItem = document.getElementById('L1_2');
  newItem.innerHTML = `<h1>L1</h1>
  <p>
    Product name <span><input class="product_L0" id="L1_2-name"/></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" id="L1_2-quantity"/></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" id="L1_2-production-time"/></span>
  </p>
  <button class="btn" onclick ="L2_2_1()" id="add-L2_2_1">Add sub-item 1</button>
  <button class="btn" onclick ="L2_2_2()" id="add-L2_2_2">Add sub-item 2</button>
  <button class="btn" onclick ="L2_2_3()" id="add-L2_2_3">Add sub-item 3</button>`;
  document.querySelector('#add-L1_2').style.visibility = 'hidden';
});

//add subitem L2_2_1
function L2_2_1() {
  let newItem = document.getElementById('L2_2_1');
  newItem.innerHTML = `<h1>L2</h1>
  <p>
    Product name <span><input class="product_L0" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" /></span>
  </p>
  <button class="btn">No subitems allowed</button>`;
  document.querySelector('#add-L2_2_1').style.visibility = 'hidden';
}

//add subitem L2_2_2
function L2_2_2() {
  let newItem = document.getElementById('L2_2_2');
  newItem.innerHTML = `<h1>L2</h1>
  <p>
    Product name <span><input class="product_L0" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" /></span>
  </p>
  <button class="btn">No subitems allowed</button>`;
  document.querySelector('#add-L2_2_2').style.visibility = 'hidden';
}

//add subitem L2_2_3
function L2_2_3() {
  let newItem = document.getElementById('L2_2_3');
  newItem.innerHTML = `<h1>L2</h1>
  <p>
    Product name <span><input class="product_L0" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" /></span>
  </p>
  <button class="btn">No subitems allowed</button>`;
  document.querySelector('#add-L2_2_3').style.visibility = 'hidden';
}

//add subitem L1_3
document.querySelector('#add-L1_3').addEventListener('click', function () {
  let newItem = document.getElementById('L1_3');
  newItem.innerHTML = `<h1>L1</h1>
  <p>
    Product name <span><input class="product_L0" id="L1_3-name"/></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" id="L1_3-quantity"/></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" id="L1_3-production-time"/></span>
  </p>
  <button class="btn" onclick ="L2_3_1()" id="add-L2_3_1">Add sub-item 1</button>
  <button class="btn" onclick ="L2_3_2()" id="add-L2_3_2">Add sub-item 2</button>
  <button class="btn" onclick ="L2_3_3()" id="add-L2_3_3">Add sub-item 3</button>`;
  document.querySelector('#add-L1_3').style.visibility = 'hidden';
});

//add subitem L2_3_1
function L2_3_1() {
  let newItem = document.getElementById('L2_3_1');
  newItem.innerHTML = `<h1>L2</h1>
  <p>
    Product name <span><input class="product_L0" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" /></span>
  </p>
  <button class="btn">No subitems allowed</button>`;
  document.querySelector('#add-L2_3_1').style.visibility = 'hidden';
}

//add subitem L2_3_2
function L2_3_2() {
  let newItem = document.getElementById('L2_3_2');
  newItem.innerHTML = `<h1>L2</h1>
  <p>
    Product name <span><input class="product_L0" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" /></span>
  </p>
  <button class="btn">No subitems allowed</button>`;
  document.querySelector('#add-L2_3_2').style.visibility = 'hidden';
}

//add subitem L2_3_3
function L2_3_3() {
  let newItem = document.getElementById('L2_3_3');
  newItem.innerHTML = `<h1>L2</h1>
  <p>
    Product name <span><input class="product_L0" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" /></span>
  </p>
  <button class="btn">No subitems allowed</button>`;
  document.querySelector('#add-L2_3_3').style.visibility = 'hidden';
}

//save product and display its structure
document.querySelector('#save-product-btn').addEventListener('click', function () {
  let product_json = {};
  product_json['productName'] = document.querySelector('#L0-name').value;
  product_json['productProductionTime'] = Number(document.querySelector('#L0-production-time').value);

  let productStructure = document.getElementById('product-structure');
  let productStructureText = '';
  let L0 = `<p>Product saved succesfully!</p>
  <p>L0 Product Name: ${product_json['productName']} </p>
  <p>L0 Product's Production/Assembly Time: ${product_json['productProductionTime']} days </p>`;

  let subItemsL1 = ``;
  try {
    for (let i = 1; i < 4; i++) {
      let nextIDName = `#L1_${i}-name`;
      let nextIDQuantity = `#L1_${i}-quantity`;
      let nextIDProductionTime = `#L1_${i}-production-time`;
      let newSubitem = `<p>L1 Subitem ${i}</p> 
      <li>     Product Name: ${document.querySelector(nextIDName).value}</li> 
      <li>     Quantity: ${document.querySelector(nextIDQuantity).value}</li>
      <li>     Production Time: ${document.querySelector(nextIDProductionTime).value} days</li>`;
      subItemsL1 += newSubitem;

      //Extending Product JSON with subitems
      let jsonKey = `SubitemL1_${i}`;
      let jsonValue = {};
      product_json[jsonKey] = {};
      jsonValue['L1SubitemName'] = document.querySelector(nextIDName).value;
      jsonValue['L1SubitemQuantity'] = Number(document.querySelector(nextIDQuantity).value);
      jsonValue['L1SubitemProductionTime'] = Number(document.querySelector(nextIDProductionTime).value);
      product_json[jsonKey] = jsonValue;
    }
    productStructure.innerHTML = productStructureText + L0 + subItemsL1;

    document.querySelector('#L1_1').innerHTML = ``;
    document.querySelector('#L1_2').innerHTML = ``;
    document.querySelector('#L1_3').innerHTML = ``;
  } catch {
    subItemsL1 = `<p>No Subitems</p>`;
    productStructure.innerHTML = productStructureText + L0 + subItemsL1;
  }

  document.querySelector('#save-product-btn').style.visibility = 'hidden';
  document.querySelector('#add-product-btn').style.visibility = 'visible';
  document.querySelector('.input-section-content-L0').style.visibility = 'hidden';
  console.log(product_json);
});

// Adding order for P0 product
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

//Saving Product Order
function saveOrder() {
  let L0ProductOrder = Number(document.querySelector(`#order-quantity`).value);
  document.querySelector('#input-order').innerHTML = `Order: ${L0ProductOrder} ea. of L0 Product`;
  document.querySelector('#save-order-btn').style.visibility = 'hidden';
  document.querySelector('#add-order-btn').style.visibility = 'visible';
  document.querySelector('#add-order-btn').innerHTML = 'Edit order';
  return L0ProductOrder;
}
