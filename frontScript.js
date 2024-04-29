'use strict';
/* // OBSOLETE GAME CODE
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  //When there is no input
  if (!guess) {
    displayMessage('⛔ No number! ');

    //When player wins the game
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    //When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high' : '📉 Too low');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('You lost the game... 😭');
      score--;
      document.querySelector('.score').textContent = score;
    }
  }
});
*/

//MRP BUTTONS SCRIPT

//display section of product data entry
document.querySelector('#add-product-btn').addEventListener('click', function () {
  document.querySelector('.product-details').style.visibility = 'visible';
  document.querySelector('#save-product-btn').style.visibility = 'visible';
});

//add subitem L1
document.querySelector('#add-L1').addEventListener('click', function () {
  let newItem = document.getElementById('L1');
  // document.querySelector('#L1').style.visibility = 'visible';
  // newItem.innerHTML = `<p>Print this text</p>`;
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
  <button class="btn" id="add-L1">Add sub-item (L2)</button>`;
});
