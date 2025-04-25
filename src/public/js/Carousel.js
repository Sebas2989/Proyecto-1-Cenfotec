/* const menu = document.querySelector(".menu");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");
const carousel = document.querySelector(".cards");

//Para computadoras de escritorio que utilicen mouse para la navegacion 
carousel.addEventListener("wheel", function (event) {
    if (event.deltaY !==0){ //<-- deltaY es una caracteeristica de "wheel" si el valor es mayor o menor a 0 va a reaccionar
        event.preventDefault(); // Evita el desplazamiento vertical
        carousel.scrollBy({
            left: event.deltaY, 
            behavior: "smooth" // Hace el scroll más fluido
        });
    }
});
//Para laptops y otros dispositivos con pantallas tactiles
carousel.addEventListener("touchmove", function (event) {
    event.preventDefault(); // Evita el desplazamiento vertical en pantallas táctiles
});
document.getElementById("mostarFormulario").addEventListener("click", function() {
    document.getElementById("formularioAvisos").classList.toggle("show")
});
document.getElementById("cerrarForm").addEventListener("click", function() {
    document.getElementById("formularioAvisos").classList.remove("show")
});
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
}); */

document.addEventListener("DOMContentLoaded", function () {
    // Verificar y agregar eventos para el formulario de avisos
    const mostrarFormularioBtn = document.getElementById("mostarFormulario");
    const cerrarFormularioBtn = document.getElementById("cerrarForm");

    if (mostrarFormularioBtn) {
        mostrarFormularioBtn.addEventListener("click", function () {
            document.getElementById("formularioAvisos").classList.toggle("show");
        });
    }

    if (cerrarFormularioBtn) {
        cerrarFormularioBtn.addEventListener("click", function () {
            document.getElementById("formularioAvisos").classList.remove("show");
        });
    }

    // Código existente para el menú desplegable
    const botonDesplegar = document.querySelector(".desplegarSesion"); // Selecciona el botón
    const lista = document.querySelector(".lista"); // Selecciona la lista que queremos mostrar/ocultar

    if (botonDesplegar && lista) {
        botonDesplegar.addEventListener("click", function () {
            lista.classList.toggle("hidden"); // Alterna la clase hidden
        });
    }

    const hamburger = document.querySelector(".hamburger"); // Selecciona el botón
    const menu = document.querySelector(".ulMenu"); // Selecciona la lista que queremos mostrar/ocultar

    if (hamburger && menu) {
        hamburger.addEventListener("click", function () {
            menu.classList.toggle("hidden2"); // Alterna la clase hidden
        });
    }
});

// Código existente para el carrusel
const carousel = document.querySelector(".cards");
if (carousel) {
    // Para computadoras de escritorio que utilicen mouse para la navegación
    carousel.addEventListener("wheel", function (event) {
        if (event.deltaY !== 0) {
            event.preventDefault(); // Evita el desplazamiento vertical
            carousel.scrollBy({
                left: event.deltaY,
                behavior: "smooth", // Hace el scroll más fluido
            });
        }
    });

    // Para laptops y otros dispositivos con pantallas táctiles
    carousel.addEventListener("touchmove", function (event) {
        event.preventDefault(); // Evita el desplazamiento vertical en pantallas táctiles
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const botonToggle = document.getElementById('toggleSolicitudes');
    const contenedor = document.querySelector('.contenedorSolicitudes');
    const adminTools = document.querySelector('.adminTools');

    botonToggle.addEventListener('click', () => {
        contenedor.classList.toggle('visible');
        adminTools.classList.toggle('visible2');
    });
});