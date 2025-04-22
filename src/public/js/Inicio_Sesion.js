const $inputs = document.querySelectorAll('#formulario input');
const $formulario = document.getElementById('formulario');

const datosPersona = {
    email: "persona@gmail.com",
    password: "1jcdhbs/$"
};

const expresiones = {
    email: /^.+@[a-zA-Z]+\.[a-zA-Z]+$/,
    password: /^.{4,12}$/ //ACEPTA TODO, MÍNIMO 4 Y MÁXIMO 12
};

const campos = {
    email: false,
    password: false
};

// Validar el formulario mientras se escribe
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "email":
            validarCampo(expresiones.email, e.target, "email");
            break;
        case "password":
            validarCampo(expresiones.password, e.target, "password");
            break;
    }
};

// Función para validar un campo específico
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        document.querySelector(`#grupo__${campo}`).classList.add("formulario__validacion-estado");
        document.querySelector(`#grupo__${campo}`).classList.remove("formulario__validacion-noestado");
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
        document.querySelector(`#grupo__${campo}`).classList.remove("formulario__validacion-estado");
        document.querySelector(`#grupo__${campo}`).classList.add("formulario__validacion-noestado");
        campos[campo] = false;
    }
};

$inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

$formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (campos.email==false || campos.password==false) {
        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
    } else {
        document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
        console.log("Se ingresó correctamente");
        $formulario.submit(); // Esto envía el formulario al servidor
    }
});
