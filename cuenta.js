document.addEventListener("DOMContentLoaded", () => {
    let carta = document.getElementById("carta");
    setInterval(carta.classList.add("activo"),1500);
});

function activarRegistro() {
    let carta = document.getElementById("carta-registro");
    if (carta.classList.contains("activo")) {
        carta.classList.remove("activo");
    }else
        carta.classList.add("activo");
}

// Scripts para la verificacion del Registro

const nombre_registro = document.getElementById("nombre_registro");
const email_registro = document.getElementById("email_registro");
const tel_registro = document.getElementById("tel_registro");
const contra_registro = document.getElementById("contra_registro");
let cuadro_error = null;
let er_nombre = {value:false};
let er_email = {value:false};
let er_tel = {value:false};
let er_contra = {value:false};
const p_regulares = /^[A-Za-zÁÉÍÓÚáéíóú]+$/;
const p_email = /^\w+[@]\w+[.]\w+$/;
const p_tel = /^[0-9]{3} [0-9]{3} [0-9]{4}$/;


function ValidarRegistro() {
    er_nombre.value = false;
    er_email.value = false;
    er_tel.value = false;
    er_contra.value = false;
    if (cuadro_error!=null) {
        cuadro_error.remove();
        cuadro_error = null;
    }
    CrearCuadro(nombre_registro,nombre_registro.value=="","Tiene que ingresar su nombre de usuario en este campo.",er_nombre);
    CrearCuadro(nombre_registro,nombre_registro.value.length>15,"El nombre no puede superar los 15 caracteres.",er_nombre);
    CrearCuadro(nombre_registro,!p_regulares.test(nombre_registro.value),"Solo ingrese letras.",er_nombre);
    CrearCuadro(email_registro,email_registro.value=="","Tiene que ingresar su email en este campo.",er_email);
    CrearCuadro(email_registro,!p_email.test(email_registro.value),"Asegurese de que su Email este escrito en su totalidad, con @ y dominio",er_email);
    CrearCuadro(tel_registro,!p_tel.test(tel_registro.value)&&tel_registro.value!=="","Solo numeros y respetando los espacios",er_tel);
    CrearCuadro(contra_registro,contra_registro.value=="","Tiene que crear una contraseña",er_contra);

    if (er_nombre.value==false&&er_email.value==false&&er_tel.value==false&&er_contra.value==false) {
        Registrarse();
    }
}

function CrearCuadro(elemento,condicion,sugerencia,er) {
    if (condicion) {
        elemento.classList.add("error");
        er.value = true;
        if (!cuadro_error) {
            cuadro_error = document.createElement("div");
            cuadro_error.innerHTML = sugerencia;
            cuadro_error.classList.add("cuadro-error");
            console.log();
            setTimeout(ActivarCuadro,50);
            elemento.insertAdjacentElement('afterend', cuadro_error);
        }
    }
}

function ActivarCuadro() {
    cuadro_error.style.right = -(cuadro_error.clientWidth+5)+"px";
    cuadro_error.classList.add("activo");
}

function EliminarCuadro() {
    cuadro_error.remove();
    cuadro_error = null;
}

nombre_registro.addEventListener('focus', function() {
    if (er_nombre.value) {
        er_nombre.value = false;
        nombre_registro.classList.remove("error");
        if (!(cuadro_error==null)) {
            cuadro_error.classList.remove("activo");
            setTimeout(EliminarCuadro,110);
        }
    }
});

email_registro.addEventListener('focus', function() {
    if (er_email.value) {
        er_email.value = false;
        email_registro.classList.remove("error");
        if (!(cuadro_error==null)) {
            cuadro_error.classList.remove("activo");
            setTimeout(EliminarCuadro,110);
        }
    }
});

tel_registro.addEventListener('focus', function() {
    if (er_tel.value) {
        er_tel.value = false;
        tel_registro.classList.remove("error");
        if (!(cuadro_error==null)) {
            cuadro_error.classList.remove("activo");
            setTimeout(EliminarCuadro,110);
        }
    }
});

contra_registro.addEventListener('focus', function() {
    if (er_contra.value) {
        er_contra.value = false;
        contra_registro.classList.remove("error");
        if (!(cuadro_error==null)) {
            cuadro_error.classList.remove("activo");
            setTimeout(EliminarCuadro,110);
        }
    }
});

function Registrarse() {
    nombre.value = nombre_registro.value;
    contra.value = contra_registro.value;
    lista.push(new Usuario(nombre_registro.value,email_registro.value,tel_registro.value,contra_registro.value));
    mensaje.classList.remove("activo");
    activarRegistro();
    nombre_registro.value = "";
    email_registro.value = "";
    tel_registro.value = "";
    contra_registro.value = "";
}

// Scripts para la verificacion de iniciar sesion

const nombre = document.getElementById("nombre");
const contra = document.getElementById("contra");
const mensaje = document.getElementById("mensaje_error");
const bienvenida = document.getElementById("bienvenida");
er_listado = {value:true};

function ValidarSesion() {
    er_nombre.value = false;
    er_contra.value = false;
    er_listado.value = true;
    if (cuadro_error!=null) {
        cuadro_error.remove();
        cuadro_error = null;
    }
    CrearCuadro(nombre,nombre.value=="","Tiene que ingresar su nombre de usuario o email en este campo.",er_nombre);
    CrearCuadro(contra,contra.value=="","Tiene que crear una contraseña",er_contra);

    BuscarEnLista();
}

function BuscarEnLista() {
    if (lista.length>0) {
        if (!er_nombre.value&&!er_contra.value)
            for (let i=0; i<lista.length; i++) {
                if ((nombre.value==lista[i].nombre||nombre.value==lista[i].email)&&contra.value==lista[i].contra) {
                    er_listado.value=false;
                }
            }
    }
    
    if (er_listado.value&&(!er_nombre.value&&!er_contra.value)) 
        mensaje.classList.add("activo");
    
    if (er_nombre.value==false&&er_contra.value==false&&er_listado.value==false) {
        mensaje.classList.remove("activo");
        IniciarSesion();
    }
}

function IniciarSesion() {
    nombre.value = "";
    contra.value = "";
    carta.classList.remove("activo");
    bienvenida.classList.add("activo");
    console.log(lista);
    setTimeout(function() {carta.style.transform = "translateX(-1500px)";}, 1000);
}

nombre.addEventListener('focus', function() {
    mensaje.classList.remove("activo");
    if (er_nombre.value) {
        er_nombre.value = false;
        nombre.classList.remove("error");
        if (!(cuadro_error==null)) {
            cuadro_error.classList.remove("activo");
            setTimeout(EliminarCuadro,110);
        }
    }
});

contra.addEventListener('focus', function() {
    mensaje.classList.remove("activo");
    if (er_contra.value) {
        er_contra.value = false;
        contra.classList.remove("error");
        if (!(cuadro_error==null)) {
            cuadro_error.classList.remove("activo");
            setTimeout(EliminarCuadro,110);
        }
    }
});

// Lista de Usuarios

class Usuario {
    constructor(nombre, email, tel, contra) {
        this.nombre = nombre;
        this.email = email;
        this.tel = tel;
        this.contra = contra;
    }
}

let lista = [new Usuario("Alexander","Alex@gmail.com","","pepe")];