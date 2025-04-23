const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.ulMenu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('hidden2');
});