const navbarBurger = document.querySelector('.navbar-burger');
const navbarMenu = document.querySelector('#navbarBasicExample');
navbarBurger.addEventListener('click', function () {
    navbarMenu.classList.toggle('is-active');
});