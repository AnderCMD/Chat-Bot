// Respuestas Aleatorias
const Respuestas = [
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

// Obtener una respuesta aleatoria basada en el mensaje recibido
function GenerarRespuestaAleatoria(Mensaje) {
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

    const Indice = Math.floor(Math.random() * Respuestas.length);
    return Respuestas[Indice];
}

// Almacenar Conversaciones
function AlmacenarConversaciones(Conversaciones) {
    const ConversacionesString = JSON.stringify(Conversaciones);
    localStorage.setItem("Conversaciones", ConversacionesString);

    // Almacenar el último mensaje de cada conversación
    const UltimosMensajes = Conversaciones.map(conversacion => {
        const UltimoMensaje = conversacion.Mensajes[conversacion.Mensajes.length - 1];
        return {
            Nombre: conversacion.Nombre,
            UltimoMensaje: UltimoMensaje ? { Hora: UltimoMensaje.Hora, Mensaje: UltimoMensaje.Contenido } : null
        };
    });
    const UltimosMensajesString = JSON.stringify(UltimosMensajes);
    localStorage.setItem("UltimosMensajes", UltimosMensajesString);
}

// Recuperar Conversacion
function RecuperarConversaciones() {
    const ConversacionesString = localStorage.getItem("Conversaciones");
    return ConversacionesString ? JSON.parse(ConversacionesString) : [];
}

// Agregar Mensaje
function AgregarMensaje(Conversaciones, NombreConversacion, Remitente, Contenido, Hora) {
    const Conversacion = ObtenerConversacion(Conversaciones, NombreConversacion);
    Conversacion.push({ Remitente, Contenido, Hora });
}

// Obtener Conversacion 
function ObtenerConversacion(Conversaciones, NombreConversacion) {
    let Conversacion = Conversaciones.find(Conversacion => Conversacion.Nombre === NombreConversacion);

    if (!Conversacion) {
        Conversacion = { Nombre: NombreConversacion, Mensajes: [] };
        Conversaciones.push(Conversacion);
    }

    return Conversacion.Mensajes;
}

// Enviar Mensaje
function EnviarMensaje() {
    const InputMensaje = document.getElementById("InputMensaje");
    const ContenedorChat = document.getElementById("ContenedorChat");
    const Mensaje = InputMensaje.value.trim();
    const Conversaciones = RecuperarConversaciones();
    const NombreConversacion = NombreConversacionInicial; // Reemplaza NombreConversacionInicial con el nombre de la conversación actual
    const FechaActual = new Date();
    const Hora = FechaActual.getHours();
    const Minutos = FechaActual.getMinutes();
    const HoraFormateada = `${Hora}:${Minutos.toString().padStart(2, "0")}`;

    if (Mensaje !== "") {
        AgregarMensaje(Conversaciones, NombreConversacion, "Usuario", Mensaje, HoraFormateada);

        const ElementoMensajeEnviado = document.createElement("div");
        const ElementoHoraEnviado = document.createElement("div");

        ElementoMensajeEnviado.textContent = Mensaje;
        ElementoMensajeEnviado.classList.add("Mensaje", "MensajeEnviado");
        ElementoHoraEnviado.textContent = HoraFormateada;
        ElementoHoraEnviado.classList.add("HoraEnviado");

        ElementoMensajeEnviado.appendChild(ElementoHoraEnviado);
        ContenedorChat.appendChild(ElementoMensajeEnviado);

        const RespuestaAleatoria = GenerarRespuestaAleatoria(Mensaje);
        AgregarMensaje(Conversaciones, NombreConversacion, "Asistente", RespuestaAleatoria, HoraFormateada);

        const ElementoMensajeRecibido = document.createElement("div");
        const ElementoHoraRecibido = document.createElement("div");

        ElementoMensajeRecibido.textContent = RespuestaAleatoria;
        ElementoMensajeRecibido.classList.add("Mensaje", "MensajeRecibido");
        ElementoHoraRecibido.textContent = HoraFormateada;
        ElementoHoraRecibido.classList.add("HoraRecibido");

        ElementoMensajeRecibido.appendChild(ElementoHoraRecibido);
        ContenedorChat.appendChild(ElementoMensajeRecibido);

        InputMensaje.value = "";
        ContenedorChat.scrollTo(0, ContenedorChat.scrollHeight);

        AlmacenarConversaciones(Conversaciones);
        ActualizarElementosHTML();
    }

    // Ocultar Emojis al Enviar
    EmojisContainer.style.display = "none";
    EmojiContainerVisible = false;
}

// Enviar mensaje con tecla Enter
const InputMensaje = document.getElementById("InputMensaje");
InputMensaje.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        EnviarMensaje();
    }
});

// Cargar Conversacion 
function CargarConversacion(Conversacion) {
    const ContenedorChat = document.getElementById("ContenedorChat");

    // Limpiar el contenido del chat antes de cargar la conversación
    ContenedorChat.innerHTML = "";

    if (Conversacion.length > 0) {
        for (const Mensaje of Conversacion) {
            const ElementoMensaje = document.createElement("div");
            const ElementoHora = document.createElement("div");

            ElementoMensaje.textContent = Mensaje.Contenido;
            ElementoMensaje.classList.add("Mensaje", Mensaje.Remitente === "Usuario" ? "MensajeEnviado" : "MensajeRecibido");
            ElementoHora.textContent = Mensaje.Hora;
            ElementoHora.classList.add(Mensaje.Remitente === "Usuario" ? "HoraEnviado" : "HoraRecibido");

            ElementoMensaje.appendChild(ElementoHora);
            ContenedorChat.appendChild(ElementoMensaje);
        }
    } else {
        const ElementoInicioConversacion = document.createElement("div");
        ElementoInicioConversacion.textContent = "Envía un mensaje para iniciar la conversación";
        ElementoInicioConversacion.classList.add("InicioConversacion");
        ContenedorChat.appendChild(ElementoInicioConversacion);
    }

    ContenedorChat.scrollTo(0, ContenedorChat.scrollHeight);
}

// Obtener el nombre y cargar la conversación correspondiente
let NombreConversacionInicial = ""; // Variable global para almacenar el nombre de la conversación inicial

function ObtenerNombre(NombreID) {
    let NombreElemento = document.getElementById(NombreID);
    let Nombre = NombreElemento.textContent.trim(); // Eliminar espacios en blanco al inicio y al final

    // Asignar el valor de Nombre al elemento UsuarioActivo
    let UsuarioActivoElemento = document.getElementById("UsuarioActivo");
    UsuarioActivoElemento.textContent = Nombre;

    // Asignar el valor de Nombre a la variable NombreConversacionInicial
    NombreConversacionInicial = Nombre;

    // Llamar a la función para cargar la conversación correspondiente al nombre obtenido
    CargarConversacion(ObtenerConversacion(RecuperarConversaciones(), NombreConversacionInicial));

    return Nombre;
}

// Obtener el último mensaje de cada conversación
function ObtenerUltimosMensajes() {
    const UltimosMensajesString = localStorage.getItem("UltimosMensajes");
    return UltimosMensajesString ? JSON.parse(UltimosMensajesString) : [];
}

// Función para actualizar los elementos HTML con el último mensaje
function ActualizarElementosHTML() {
    const UltimosMensajes = ObtenerUltimosMensajes();

    for (let i = 0; i < UltimosMensajes.length; i++) {
        const NombreConversacion = UltimosMensajes[i].Nombre;
        const UltimoMensaje = UltimosMensajes[i].UltimoMensaje;

        // Actualizar los elementos HTML correspondientes
        const HoraElemento = document.getElementById(`Hora${i + 1}`);
        const MensajeElemento = document.getElementById(`Mensaje${i + 1}`);

        if (HoraElemento && MensajeElemento) {
            HoraElemento.textContent = UltimoMensaje ? UltimoMensaje.Hora : "No hay mensajes";
            MensajeElemento.textContent = UltimoMensaje ? UltimoMensaje.Mensaje : "No hay mensajes";
        }
    }
}

// Conversacion Inicial
const Conversaciones = RecuperarConversaciones();
NombreConversacionInicial = ObtenerNombre("Nombre1"); // Reemplaza "Nombre1" con el ID correspondiente al primer chat
const ConversacionInicial = ObtenerConversacion(Conversaciones, NombreConversacionInicial);
ActualizarElementosHTML();
CargarConversacion(ConversacionInicial);

// !-----------------------------------------------------------------------
// ! ADVERTENCIA - Borra todas las conversaciones existentes - ADVERTENCIA

// ? Al dar click en Settings en la barra de navegacion de la izquierda
// ? Se borraran todas las conversaciones existentes

function BorrarConversaciones() {
    localStorage.removeItem("Conversaciones");
    const ContenedorChat = document.getElementById("ContenedorChat");
    ContenedorChat.innerHTML = "";
}

// !-----------------------------------------------------------------------