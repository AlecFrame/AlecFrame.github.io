document.addEventListener("DOMContentLoaded", () => {
    let carta = document.getElementById("carta");
    setInterval(carta.classList.add("activo"),1500);
});