const menu = document.querySelector(".menu");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");
const carousel = document.querySelector(".cards");

//Ids contenedorSesion, desplegarSesion, cerrarSesion
document.addEventListener("DOMContentLoaded", function() {
    const botonDesplegar = document.querySelector(".desplegarSesion"); // Selecciona el botón
    const lista = document.querySelector(".lista"); // Selecciona la lista que queremos mostrar/ocultar

    if (botonDesplegar && lista) {
        botonDesplegar.addEventListener("click", function() {
            lista.classList.toggle("hidden"); // Alterna la clase hidden
        });
    }
    const hamburger = document.querySelector(".hamburger"); // Selecciona el botón
    const menu = document.querySelector(".ulMenu"); // Selecciona la lista que queremos mostrar/ocultar

    if (hamburger && menu) {
        hamburger.addEventListener("click", function() {
            menu.classList.toggle("hidden2"); // Alterna la clase hidden
        });
    }
});