const inputPrincipal = document.getElementById('usuario_moni');  // Corregir la referencia al input
const perfiles = document.querySelectorAll('.perfilUnitario');  // Selecciona todos los perfiles con la clase '.perfilUnitario'
const compararButton = document.getElementById('compararButton_moni');  // Selecciona el botón de búsqueda
const mensajeCoparando = document.getElementById('formulario__mensaje-sinCoincidencia'); // Seleccionar el mensaje de sin coincidencias


const compararValores = () => {
    const valorInputPrincipal = inputPrincipal.value.trim().toLowerCase(); // Obtener el valor del input y convertirlo a minúsculas
    let coincidencias = false;

    if (valorInputPrincipal === '') {
        // Si el campo está vacío, mostrar todos los perfiles
        mensajeCoparando.classList.add('mensajesOcultos'); // Mostrar el mensaje si no hay coincidencias
        mensajeCoparando.classList.remove('mensajes'); // Mostrar el mensaje si no hay coincidencias
        perfiles.forEach(perfil => {
            perfil.classList.remove('esconder');
            perfil.classList.add('mostrar');
        });
        return; // Salir de la función si no hay texto
    }
    
    // Iterar sobre todos los perfiles y verificar si el texto del input coincide con el nombre del perfil
    perfiles.forEach(perfil => {
        const nombrePerfil = perfil.querySelector('.nombreDescrito').textContent.trim().toLowerCase();  // Obtener el texto del nombre del perfil
        if (nombrePerfil.includes(valorInputPrincipal)) {
            // Si hay coincidencia, mostrar el perfil
            coincidencias = true;
            perfil.classList.add('mostrar');
            perfil.classList.remove('esconder');
        } else {
            // Si no hay coincidencia, esconder el perfil
            perfil.classList.add('esconder');
            perfil.classList.remove('mostrar');
        }
    });

    // Mostrar u ocultar el mensaje según haya coincidencias
    if (!coincidencias) {
        mensajeCoparando.classList.remove('mensajesOcultos'); // Mostrar el mensaje si no hay coincidencias
        mensajeCoparando.classList.add('mensajes'); // Mostrar el mensaje si no hay coincidencias
    } else {
        mensajeCoparando.classList.add('mensajesOcultos'); // Ocultar el mensaje si hay coincidencias
        mensajeCoparando.classList.remove('mensajes'); // Ocultar el mensaje si hay coincidencias
    }
};

// Agregar el event listener al botón para ejecutar la búsqueda cuando se haga clic
compararButton.addEventListener('click', compararValores);

document.addEventListener('DOMContentLoaded', () => {
    // Contamos la cantidad de perfiles
    const perfiles = document.querySelectorAll('.perfilUnitario');

    // Seleccionamos el elemento <p> con id "cantidadUsuarios"
    const cantidadUsuarios = document.getElementById('cantidadUsuarios');

    // Modificamos el contenido del <p> con el número de perfiles
    cantidadUsuarios.textContent = `${perfiles.length} usuarios`;
});