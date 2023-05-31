function enviarMensaje() {
    var inputMensaje = document.getElementById("inputMensaje");
    var contenedorChat = document.getElementById("contenedorChat");
    var mensaje = inputMensaje.value.trim();

    if (mensaje !== "") {
        var elementoMensaje = document.createElement("div");
        var elementoHora = document.createElement("div");
        var fechaActual = new Date();
        var hora = fechaActual.getHours();
        var minutos = fechaActual.getMinutes();
        var horaFormateada = hora + ":" + minutos.toString().padStart(2, '0');

        elementoMensaje.textContent = mensaje;
        elementoMensaje.classList.add("Mensaje", "MensajeEnviado");
        elementoHora.textContent = horaFormateada;
        elementoHora.classList.add("HoraEnviado");

        elementoMensaje.appendChild(elementoHora);
        contenedorChat.appendChild(elementoMensaje);

        inputMensaje.value = "";
        contenedorChat.scrollTo(0, contenedorChat.scrollHeight);
    }
}

var inputMensaje = document.getElementById("inputMensaje");
inputMensaje.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        enviarMensaje();
    }
});
