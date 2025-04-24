document.addEventListener('DOMContentLoaded', () => {
    const botonEditar = document.getElementById('boton-editar-perfil');
    let modoEdicion = false;

    botonEditar.addEventListener('click', (e) => {
        e.preventDefault();
        modoEdicion = !modoEdicion;

        const contenedor = document.querySelector('.informacion-personal');
        const campos = contenedor.querySelectorAll('[data-field]');

        campos.forEach(campo => {
            const fieldName = campo.getAttribute('data-field');

            if (modoEdicion) {
                const valorActual = campo.textContent.trim();

                const input = document.createElement('input');
                input.type = 'text';
                input.value = valorActual;
                input.name = fieldName;
                input.classList.add('campo-editable');

                campo.replaceWith(input);
            } else {
                const input = contenedor.querySelector(`input[name="${fieldName}"]`);
                if (input) {
                    const nuevoP = document.createElement('p');
                    nuevoP.textContent = input.value;
                    nuevoP.setAttribute('data-field', fieldName);
                    input.replaceWith(nuevoP);
                }
            }
        });

        const contenedorImagen = document.getElementById('contenedor-imagen');

        if (modoEdicion) {
            const inputImagen = document.createElement('input');
            inputImagen.type = 'file';
            inputImagen.name = 'imagen_nueva';
            inputImagen.accept = 'image/*';

            inputImagen.addEventListener('change', (e) => {
                const archivo = e.target.files[0];
                if (archivo) {
                    const lector = new FileReader();
                    lector.onload = function(evt) {
                        const img = contenedorImagen.querySelector('img');
                        img.src = evt.target.result;
                    };
                    lector.readAsDataURL(archivo);
                }
            });

            contenedorImagen.appendChild(inputImagen);
        } else {
            const inputFile = contenedorImagen.querySelector('input[type="file"]');
            if (inputFile) {
                inputFile.remove();
            }
        }

        botonEditar.textContent = modoEdicion ? 'Guardar' : 'Editar';

        if (!modoEdicion) {
            document.getElementById('form-editar-perfil').submit();
        }
    });
});