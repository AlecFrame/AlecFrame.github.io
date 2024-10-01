let i = 0;
let imagenes = document.querySelectorAll(".fondo");
let textos = document.querySelectorAll(".pack-texto");

console.log(imagenes)
console.log(textos)

let total = imagenes.length;

function imagenSiguiente() {
    imagenes[i].classList.remove("activo");
    textos[i].classList.remove("activo");
    i = (i+1) % total;
    imagenes[i].classList.add("activo");
    textos[i].classList.add("activo");
}

setInterval(imagenSiguiente, 6000);

function imagenAnterior() {
    imagenes[i].classList.remove("activo");
    textos[i].classList.remove("activo");
    if (i-1<0) {i=(imagenes.length-1)}else{i=i-1}
    imagenes[i].classList.add("activo");
    textos[i].classList.add("activo");
}