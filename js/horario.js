document.addEventListener("DOMContentLoaded", function () {
    const agora = new Date();
    const hora = agora.getHours();

    if (hora < 8 || hora >= 18) {
        document.getElementById("fora-do-horario").style.display = "flex";
    }
});