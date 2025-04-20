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





document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("miModal");
    const cerrar = document.querySelector(".close");
    const form = document.getElementById("modalForm");
  
    document.querySelectorAll(".idDenuncia").forEach(td => {
      td.addEventListener("click", function () {
        document.getElementById("modalId").textContent = this.dataset.id;
        document.getElementById("modalAsunto").textContent = this.dataset.asunto;
        document.getElementById("modalFecha").textContent = this.dataset.fecha;
        document.getElementById("modalFechaSuceso").textContent = this.dataset.fechaCreacion;
        document.getElementById("modalEstado").textContent = this.dataset.estado;
  
        // Mostrar hasta 5 imágenes
        const imagenesDiv = document.getElementById("modalImagenes");
        imagenesDiv.innerHTML = '';
        const imagenes = JSON.parse(this.dataset.imagenes || "[]");
        imagenes.slice(0, 5).forEach(src => {
          const img = document.createElement("img");
          img.src = src;
          imagenesDiv.appendChild(img);
        });
  
        modal.style.display = "block";
      });
    });
  
    cerrar.onclick = () => {
      modal.style.display = "none";
      form.reset();
    };
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const id = document.getElementById("modalId").textContent;
      const nuevoEstado = document.getElementById("estadoSelect").value;
      const comentario = document.getElementById("comentario").value;
  
      console.log("Cambios para ID:", id);
      console.log("Nuevo estado:", nuevoEstado);
      console.log("Comentario:", comentario);
  
      alert("Cambios guardados (simulado)");
      modal.style.display = "none";
      form.reset();
    });
  });
  