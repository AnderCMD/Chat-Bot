function FiltrarChats() {
    const InputBuscar = document.getElementById("UserChat");
    const valorBusqueda = InputBuscar.value.toLowerCase();
    const ContenedorChats = document.querySelector(".Contenedor-Chats");
    const chats = ContenedorChats.getElementsByTagName("a");

    for (let i = 0; i < chats.length; i++) {
        const chat = chats[i];
        const nombreChat = chat.querySelector("b").textContent.toLowerCase();

        if (nombreChat.includes(valorBusqueda)) {
            chat.style.display = "block";
        } else {
            chat.style.display = "none";
        }
    }
}

const InputBuscar = document.getElementById("UserChat");
InputBuscar.addEventListener("input", FiltrarChats);
