'use strict';

//MODAL WINDOW SCRIPTS

const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.close-modal');
const overlay =document.querySelector('.overlay');

btnCloseModal.addEventListener('click', function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
});