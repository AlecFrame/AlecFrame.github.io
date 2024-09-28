let i = 0;
let imagenes = document.querySelectorAll("section img");
let total = imagenes.length;

function imagenSiguiente() {
    console.log("activando");
    imagenes[i].classList.remove("activo");
    i = (i+1) % total;
    imagenes[i].classList.add("activo");
}

setInterval(imagenSiguiente, 6000);

const textoElemento = document.getElementById("texto");
const texto = textoElemento.textContent;
let pes = document.querySelectorAll(".carrusel div p");
console.log(pes)
textoElemento.textContent = "";

let a = 0;
let b = 0;

function ejecutarPuntos() {
    if (b < pes.length) {
        pes[b].classList.add("activo");
        b++;
        setTimeout(ejecutarPuntos, 500);
    }
}

function mostrarTexto() {
    textoElemento.classList.add("activo");
    if (a < texto.length) {
        textoElemento.textContent += texto.charAt(a);
        a++;
        setTimeout(mostrarTexto, 35);
    }else
        setTimeout(ejecutarPuntos, 400);
}


window.onload = mostrarTexto