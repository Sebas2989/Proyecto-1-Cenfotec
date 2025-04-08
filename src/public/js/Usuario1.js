const contenedores = document.querySelectorAll('.contenedor-imagen');

const selectDenuncia = document.getElementById('denuncia');

    const denuncias = document.querySelectorAll('.denuncia-individual');

    contenedores.forEach((contenedor) => {
        const imagen = contenedor.querySelector('.imagen-denuncia');
        const imagenes = contenedor.getAttribute('data-images') ? contenedor.getAttribute('data-images').split(',') : []; // Obtenemos las imágenes de 'data-images' como array (con comprobación de existencia)
        let currentImageIndex = 0;

        if (imagenes.length === 0) {
            console.warn('El contenedor no tiene imágenes asociadas');
            return;
        }

        contenedor.addEventListener('click', function () {
            currentImageIndex = (currentImageIndex + 1) % imagenes.length; // Incrementa y vuelve a 0 al llegar al final
            imagen.src = imagenes[currentImageIndex];
        });

        contenedor.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            currentImageIndex = (currentImageIndex - 1 + imagenes.length) % imagenes.length; // Decrementa y vuelve al final si llega a 0
            imagen.src = imagenes[currentImageIndex];
        });
    });

    selectDenuncia.addEventListener('change', function () {
        denuncias.forEach(denuncia => {
            denuncia.classList.add('oculto');
            denuncia.classList.remove('mostrar');
        });

        const seleccionada = selectDenuncia.value;

        if(seleccionada=="Todas"){
            denuncias.forEach(denuncia => {
                denuncia.classList.remove('oculto');
                denuncia.classList.add('mostrar');
            });
        } else{
            const denunciaSeleccionada = document.getElementById(`denuncia${selectDenuncia.selectedIndex}`);
            denunciaSeleccionada.classList.remove('oculto');
            denunciaSeleccionada.classList.add('mostrar');
        }
    });