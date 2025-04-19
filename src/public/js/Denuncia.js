function mostrarFormulario() {
    // Muestra el formulario
    const form = document.getElementById('nuevaDenunciaForm_jean');
    form.classList.remove('hide_jean');
    form.classList.add('show_jean');

    // Oculta la tabla
    const tabla = document.querySelector('.tableDenuncias_jean');
    tabla.classList.remove('show_jean');
    tabla.classList.add('hide_jean');
}

function cerrarFormulario() {
    // Oculta el formulario
    const form = document.getElementById('nuevaDenunciaForm_jean');
    form.classList.remove('show_jean');
    form.classList.add('hide_jean');

    // Muestra la tabla
    const tabla = document.querySelector('.tableDenuncias_jean');
    tabla.classList.remove('hide_jean');
    tabla.classList.add('show_jean');
}

// Función para manejar el toggle de los textos debajo de cada botón
function toggleTexto(index) {
    const textos = document.querySelectorAll('.texto');
    const texto = textos[index]; // Obtiene el texto correspondiente al botón
    texto.classList.toggle('show'); // Cambia la visibilidad del texto (lo muestra o oculta)

    // Cierra otros textos si están abiertos
    textos.forEach((item, i) => {
        if (i !== index) {
            item.classList.remove('show'); // Cierra todos los demás textos
        }
    });
}

// Añadir el evento de clic a cada botón de la clase 'opcion'
document.querySelectorAll('.opcion').forEach((button, index) => {
    button.addEventListener('click', () => toggleTexto(index)); // Llama a la función de toggle cuando se hace clic
});
