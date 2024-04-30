'use strict';

//MRP BUTTONS SCRIPT

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
    Product name <span><input class="product_L0" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" /></span>
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
    Product name <span><input class="product_L0" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" /></span>
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
    Product name <span><input class="product_L0" /></span>
  </p>
  <p>
    Quantity <span><input type="number" class="product_L0" /></span>
  </p>
  <p>
    Production time<span><input type="number" class="product_L0" /></span>
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
