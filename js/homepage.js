/*Hamburger menu */

const ham_button = document.querySelector('.hamburger');
const ham_menu = document.querySelector('.ham-list');

ham_button.addEventListener('click', function(){
    ham_button.classList.toggle('is-active');
    ham_menu.classList.toggle('is-active');
});




/* */