function mostrarFormulario() {
    // Muestra el formulario
    document.getElementById('nuevaDenunciaForm').classList.add('show');
    
    // Oculta la tabla
    document.querySelector('.tableDenuncias').classList.add('hide');
}

function cerrarFormulario() {
    // Oculta el formulario
    document.getElementById('nuevaDenunciaForm').classList.remove('show');
    
    // Muestra la tabla
    document.querySelector('.tableDenuncias').classList.remove('hide');
}



// Función para manejar el toggle de los textos debajo de cada botón
function toggleTexto(index) {
    const texto = document.querySelectorAll('.texto')[index]; // Obtiene el texto correspondiente al botón
    texto.classList.toggle('show'); // Cambia la visibilidad del texto (lo muestra o oculta)

    // Cierra otros textos si están abiertos
    document.querySelectorAll('.texto').forEach((item, i) => {
        if (i !== index) {
            item.classList.remove('show'); // Cierra todos los demás textos
        }
    });
}

// Añadir el evento de clic a cada botón de la clase 'opcion'
document.querySelectorAll('.opcion').forEach((button, index) => {
    button.addEventListener('click', () => toggleTexto(index)); // Llama a la función de toggle cuando se hace clic
});
