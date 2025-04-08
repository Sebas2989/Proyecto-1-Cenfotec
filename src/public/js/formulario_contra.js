document.getElementById("form2").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue

    let modal = document.getElementById("mensaje2");
    let video = document.getElementById("video2");

    modal.classList.add("show"); // Muestra el modal
    video.currentTime = 0; // Reinicia el video al inicio
    video.play(); // Reproduce el video
});