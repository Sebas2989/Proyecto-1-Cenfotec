const form = document.getElementById("form");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que el formulario se envíe y la página se recargue

        let modal = document.getElementById("mensaje");
        let video = document.getElementById("video");

        modal.classList.add("show"); // Muestra el modal
        video.currentTime = 0; // Reinicia el video al inicio
        video.play(); // Reproduce el video
    });
}