const $inputs2 = document.querySelectorAll('#formulario_moni input');
const $formulario2 = document.getElementById('formulario_moni');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.ulMenu');

const datosPersona2 = {
    nombre: "Alejandro Rodriguez",
    identificacion: "4-0223-05-27",
    email: "persona@gmail.com",
    password: "1jcdhbs/$",
    password2: "1jcdhbs/$",
    direccion: "20 m oeste y 100 norte",
    distrito: "San Pedro",
    telefono: 61510667
};

const expresiones2 = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    identificacion: /^\d{2}-\d{4}-\d{4}$/,
    email: /^.+@[a-zA-Z]+\.[a-zA-Z]+$/,
    password: /^.{4,12}$/, //ACEPTA TODO, MÍNIMO 4 Y MÁXIMO 12
    direccion: /^.{10,40}$/,
    distrito: /^[a-zA-ZÀ-ÿ\s]{5,20}$/,
    telefono: /^\d{8,11}$/
};

const campos2 = {
    nombre: false,
    identificacion: false,
    email: false,
    password: false,
    direccion: false,
    distrito: false,
    telefono: false
};

// Validar el formulario mientras se escribe
const validarFormulario2 = (e) => {
    switch (e.target.name) {
        case "nombre_moni":
            validarCampo2(expresiones2.nombre, e.target, "nombre");
            break;
        case "identificacion_moni":
            validarCampo2(expresiones2.identificacion, e.target, "identificacion");
            break;
        case "email_moni":
            validarCampo2(expresiones2.email, e.target, "email");
            break;
        case "password_moni":
            validarCampo2(expresiones2.password, e.target, "password");
            validarPassword2();
            break;
        case "password2":
            validarPassword2();
        break;
        case "direccion_moni":
            validarCampo2(expresiones2.direccion, e.target, "direccion");
            break;
        case "distrito_moni":
            validarCampo2(expresiones2.distrito, e.target, "distrito");
            break;
        case "telefono_moni":
            validarCampo2(expresiones2.telefono, e.target, "telefono");
            break;
    }
};

const validarPassword2 = () =>{
    let inputPassword1= document.getElementById("password_moni");
    let inputPassword2= document.getElementById("password2_moni");

    if(inputPassword1.value !== inputPassword2.value){
        document.getElementById(`grupo__password2_moni`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2_moni`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2_moni .formulario__input-error`).classList.add("formulario__input-error-activo");
        document.querySelector(`#grupo__password2_moni i`).classList.remove("formulario__validacion-estado");
        document.querySelector(`#grupo__password2_moni i`).classList.add("formulario__validacion-noestado");
        campos2[password]=false;
    }else{
        document.getElementById(`grupo__password2_moni`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2_moni`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2_moni .formulario__input-error`).classList.remove("formulario__input-error-activo");
        document.querySelector(`#grupo__password2_moni i`).classList.add("formulario__validacion-estado");
        document.querySelector(`#grupo__password2_moni i`).classList.remove("formulario__validacion-noestado");

        campos2[password]=true;
    }

}

// Función para validar un campo específico
const validarCampo2 = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}2`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}2`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo}2 .formulario__input-error`).classList.remove("formulario__input-error-activo");
        document.querySelector(`#grupo__${campo}2`).classList.add("formulario__validacion-estado");
        document.querySelector(`#grupo__${campo}2`).classList.remove("formulario__validacion-noestado");
        campos2[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}2`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}2`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo}2 .formulario__input-error`).classList.add("formulario__input-error-activo");
        document.querySelector(`#grupo__${campo}2`).classList.remove("formulario__validacion-estado");
        document.querySelector(`#grupo__${campo}2`).classList.add("formulario__validacion-noestado");
        campos2[campo] = false;
    }
};

$inputs2.forEach((input) => {
    input.addEventListener("keyup", validarFormulario2);
    input.addEventListener("blur", validarFormulario2);
});

/* $formulario2.addEventListener("submit", (e) => {
    e.preventDefault();

    if (campos2.nombre == false || campos2.identificacion == false || campos2.email == false || campos2.password == false ||
        campos2.direccion == false || campos2.direccion == false || campos2.distrito == false || campos2.telefono == false) {
        document.getElementById("formulario__mensaje_moni").classList.add("formulario__mensaje-activo");
        document.getElementById("formulario__mensaje-exito_moni").classList.remove("formulario__mensaje-activo");
    } else {
        document.getElementById("formulario__mensaje_moni").classList.remove("formulario__mensaje-activo");
        document.getElementById("formulario__mensaje-exito_moni").classList.add("formulario__mensaje-activo");
        console.log("Se ingresó correctamente");
        setTimeout(() => {
            location.reload();
        }, 4000);
    }
});  
 */

$formulario2.addEventListener("submit", (e) => {
    e.preventDefault();

    if (campos2.nombre && campos2.identificacion && campos2.email && campos2.password &&
        campos2.direccion && campos2.distrito && campos2.telefono) {
        console.log("Se ingresó correctamente");
        $formulario2.submit(); // Envía el formulario al servidor
    } else {
        document.getElementById("formulario__mensaje_moni").classList.add("formulario__mensaje-activo");
        console.log("Error en las validaciones");
    }
});