/*console.log("validacion");

const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target);
});  */

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
   // console.log(tipoDeInput);
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "minimo 6 caracteres, maximo 12, una letra mayuscula, una minuscula, un número y sin caracteres especiales"
    },
    nacimiento: {
        valueMissing: "El campo fecha de nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "El campo número no puede estar vacio",
        patternMismatch: "El formato requerido es (XXX)-XXX-XXXX 10 digitos"
    },
    direccion: {
        valueMissing: "El campo dirección no puede estar vacio",
        patternMismatch: "Minimo de 10 caracteres y maximo de 40 caracteres"
    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacio",
        patternMismatch: "Minimo de 10 caracteres y maximo de 40 caracteres"
    },
    estado: {
        valueMissing: "El campo estado no puede estar vacio",
        patternMismatch: "Minimo de 10 caracteres y maximo de 40 caracteres"
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    let shouldSkip = false;
    console.log(tipoDeInput, input);
    tipoDeErrores.forEach((error) => {
        //console.log(error);
        if(shouldSkip) {
            return;
        }
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(mensajesError[tipoDeInput][error]);
            mensaje = mensajesError[tipoDeInput][error]; 
            shouldSkip = true;
        }
        
    });

    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    mayorEdad(fechaCliente);
    let mensaje = "";
    if(!mayorEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad.";
    }
    input.setCustomValidity(mensaje);
};

function mayorEdad(fecha) {
    const fechaActual = new Date();
    console.log(fecha, " ---  ", fechaActual);

    const diferenciaFechas = 
    new Date(fecha.getUTCFullYear() + 18,
     fecha.getUTCMonth(),
      fecha.getUTCDate());

      return diferenciaFechas <= fechaActual;
}