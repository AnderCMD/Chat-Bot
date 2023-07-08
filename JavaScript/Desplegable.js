// * Boton Chat
function OcultarChat(EstadoChat) {
    const ElementoChatContenedor = document.getElementById('ChatContenedor');
    const ElementoChatsBoton = document.getElementById('ChatsBoton')
    const ElementoBusquedaChats = document.getElementById('BusquedaChats');

    if (ElementoChatContenedor.classList.contains('Oculto')) {
        ElementoChatContenedor.classList.remove('Oculto');
        ElementoChatsBoton.classList.add('Activo');
        ElementoBusquedaChats.style.maxWidth = '';
    } else {
        ElementoChatContenedor.classList.add('Oculto');
        ElementoChatsBoton.classList.remove('Activo');
        ElementoBusquedaChats.style.maxWidth = '100%';
    }

    return EstadoChat;
}

// * Boton Contactos
function OcultarContactos() {
    const ElementoBusquedaChats = document.getElementById('BusquedaChats');
    const ElementoChatContenedor = document.getElementById('ChatContenedor');
    const ElementoContactosBoton = document.getElementById('ContactosBoton')

    if (ElementoBusquedaChats.classList.contains('Oculto')) {
        ElementoBusquedaChats.classList.remove('Oculto');
        ElementoContactosBoton.classList.add('Activo');
        ElementoChatContenedor.style.width = '';
        ElementoChatContenedor.style.marginLeft = '';
    } else {
        ElementoBusquedaChats.classList.add('Oculto');
        ElementoChatContenedor.style.width = '100%';
        ElementoChatContenedor.style.marginLeft = '1em';
        ElementoContactosBoton.classList.remove('Activo');
    }
}

function ActivarFuncion(EstadoChat, EstadoContactos) {
    if (EstadoChat && EstadoContactos) {
        OcultarContactos();
    } else {
        OcultarChat();
    }
}

function VerificarPestanaActiva() {
    const ElementoChatContenedor = document.getElementById('ChatContenedor');
    const ElementoContactosBoton = document.getElementById('ContactosBoton');

    let EstadoChat = true;
    let EstadoContactos = true;

    if (ElementoChatContenedor.classList.contains('Oculto') && ElementoContactosBoton.classList.contains('Oculto')) {
        EstadoChat = false;
        EstadoContactos = false;
    } else {
        EstadoChat = true;
        EstadoContactos = true;
    }

    return [EstadoChat, EstadoContactos];
}

function VerificarMedida() {
    let [EstadoChat, EstadoContactos] = VerificarPestanaActiva();

    if (EstadoChat && EstadoContactos) {
        // Obtén la anchura actual de la pantalla
        let AnchuraPantalla = window.innerWidth;

        // Verifica si se ha alcanzado la medida deseada (por ejemplo, 1520 píxeles)
        if (AnchuraPantalla <= 1520) {
            ActivarFuncion(EstadoChat, EstadoContactos);
        }
    }
}

// Verifica la medida al cargar la página
VerificarMedida();
