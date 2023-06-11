// Respuestas predefinidas
var Respuestas = [
    "¡Hola!",
    "Entiendo lo que dices.",
    "Eso suena interesante.",
    "Estoy de acuerdo contigo.",
    "¿Podrías darme más detalles?",
    "Me gustaría saber más sobre eso.",
    "No estoy seguro, déjame investigarlo.",
    "¡Gracias por compartir tu opinión!",
    "¿Has considerado otras opciones?",
    "Creo que tienes razón.",
    "¿En qué puedo ayudarte?"
];

function GenerarRespuestaAleatoria(Mensaje) {
    // Verificar el Mensaje enviado y generar respuesta congruente
    if (Mensaje.toLowerCase().includes("hola")) {
        return "¡Hola! ¿Cómo puedo ayudarte?";
    } else if (Mensaje.toLowerCase().includes("gracias")) {
        return "De nada, siempre estoy aquí para ayudar.";
    } else if (
        Mensaje.toLowerCase().includes("adios") ||
        Mensaje.toLowerCase().includes("adiós") ||
        Mensaje.toLowerCase().includes("bye")
    ) {
        return "Hasta luego, que tengas un buen día.";
    }

    // Si no se encuentra una congruencia específica, se genera una respuesta aleatoria
    var Indice = Math.floor(Math.random() * Respuestas.length);
    return Respuestas[Indice];
}

function EnviarMensaje() {
    var InputMensaje = document.getElementById("InputMensaje");
    var ContenedorChat = document.getElementById("ContenedorChat");
    var Mensaje = InputMensaje.value.trim();

    if (Mensaje !== "") {
        // Crear Mensaje enviado
        var ElementoMensajeEnviado = document.createElement("div");
        var ElementoHoraEnviado = document.createElement("div");
        var FechaActual = new Date();
        var Hora = FechaActual.getHours();
        var Minutos = FechaActual.getMinutes();
        var HoraFormateada = Hora + ":" + Minutos.toString().padStart(2, "0");

        ElementoMensajeEnviado.textContent = Mensaje;
        ElementoMensajeEnviado.classList.add("Mensaje", "MensajeEnviado");
        ElementoHoraEnviado.textContent = HoraFormateada;
        ElementoHoraEnviado.classList.add("HoraEnviado");

        ElementoMensajeEnviado.appendChild(ElementoHoraEnviado);
        ContenedorChat.appendChild(ElementoMensajeEnviado);

        // Generar Mensaje aleatorio como respuesta
        var RespuestaAleatoria = GenerarRespuestaAleatoria(Mensaje);

        // Crear Mensaje recibido
        var ElementoMensajeRecibido = document.createElement("div");
        var ElementoHoraRecibido = document.createElement("div");

        ElementoMensajeRecibido.textContent = RespuestaAleatoria;
        ElementoMensajeRecibido.classList.add("Mensaje", "MensajeRecibido");

        // Agregar Hora al Mensaje
        ElementoHoraRecibido.textContent = HoraFormateada;
        ElementoHoraRecibido.classList.add("HoraRecibido");

        ElementoMensajeRecibido.appendChild(ElementoHoraRecibido);
        ContenedorChat.appendChild(ElementoMensajeRecibido);

        InputMensaje.value = "";
        ContenedorChat.scrollTo(0, ContenedorChat.scrollHeight);
    }

    // Cerrar el contenedor de emojis
    EmojisContainer.style.display = "none";
    EmojiContainerVisible = false;
}

var InputMensaje = document.getElementById("InputMensaje");
InputMensaje.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        EnviarMensaje();
    }
});

// Obtener los elementos Chat-Preview
var ElementosChatPreview = document.getElementsByClassName("Chat-Preview");

// Obtener el elemento UsuarioActivo
var ElementoUsuarioActivo = document.getElementById("UsuarioActivo");

// Agregar evento de clic a cada elemento de vista previa de chat
for (var i = 0; i < ElementosChatPreview.length; i++) {
    ElementosChatPreview[i].addEventListener("click", function () {
        var Nombre = this.querySelector("#Nombre").textContent;

        ElementoUsuarioActivo.textContent = Nombre;
    });
}