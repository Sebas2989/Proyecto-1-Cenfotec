// Selección de elementos
const contenedores = document.querySelectorAll('.contenedor-imagen');
const selectDenuncia = document.getElementById('denuncia-usuario');
const denuncias = document.querySelectorAll('.denuncia-individual');

// Manejo de carrusel de imágenes
contenedores.forEach((contenedor) => {
    const imagen = contenedor.querySelector('img'); // ← Selecciona la imagen real, no por clase
    const imagenesData = contenedor.getAttribute('data-images');

    if (!imagen || !imagenesData) {
        console.warn('Falta imagen o data-images en el contenedor', contenedor);
        return;
    }

    const imagenes = imagenesData.split(',');
    let currentImageIndex = 0;

    contenedor.addEventListener('click', function () {
        currentImageIndex = (currentImageIndex + 1) % imagenes.length;
        imagen.src = `/img/${imagenes[currentImageIndex]}`; // Ajusta la ruta si es necesario
    });

    contenedor.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        currentImageIndex = (currentImageIndex - 1 + imagenes.length) % imagenes.length;
        imagen.src = `/img/${imagenes[currentImageIndex]}`;
    });
});

// Filtro por denuncias
selectDenuncia.addEventListener('change', function () {
    const seleccionada = selectDenuncia.value;

    denuncias.forEach(denuncia => {
        const esSeleccionada = (seleccionada === "Todas") || (denuncia.id === seleccionada);
        denuncia.classList.toggle('mostrar', esSeleccionada);
        denuncia.classList.toggle('oculto', !esSeleccionada);
    });
});

// Asegurarse de que el documento está completamente cargado antes de ejecutar
document.addEventListener('DOMContentLoaded', () => {
    const botonEditar = document.getElementById('editar-boton');
    const botonGuardar = document.getElementById('guardar-boton');
    
    const camposTexto = document.querySelectorAll('.campo-editar');
    const camposInput = document.querySelectorAll('#form-editar-usuario input');
    
    botonEditar.addEventListener('click', () => {
        camposTexto.forEach(campo => campo.style.display = 'none');
        camposInput.forEach(input => input.style.display = 'inline-block');
        
        botonEditar.style.display = 'none';
        botonGuardar.style.display = 'inline-block';
    });

    botonGuardar.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir el envío inmediato del formulario
        botonGuardar.disabled = true;  // Deshabilitar el botón "Guardar" para evitar múltiples envíos
        botonGuardar.innerHTML = 'Guardando...'; // Cambiar el texto del botón para indicar que se está guardando

        // Envía el formulario después de un pequeño retraso (por ejemplo, 500ms)
        setTimeout(() => {
            document.getElementById('form-editar-usuario').submit();  // Enviar formulario
        }, 500);
    });
});