// Array de Nombres aleatorios
var Nombres = [
    "Juan Pérez", "María García", "Luis Rodríguez", "Ana Martínez", "Carlos López",
    "Laura Torres", "Pedro Sánchez", "Sofía Ramírez", "Diego Castro", "Isabella Vargas",
    "Alejandro Torres", "Camila Gómez", "Andrés Ramírez", "Valentina Herrera", "Javier Medina",
    "Daniela Morales", "Mateo Rojas", "Fernanda Ortiz", "Gabriel Silva", "Renata Jiménez",
    "Emilio Castro", "Mariana Mendoza", "Sebastián Vargas", "Isabel Torres", "Esteban Gutiérrez"
];

// Array de Horas aleatorias
var Horas = [
    "9:30 AM", "2:15 PM", "6:00 PM", "11:20 AM", "4:45 PM",
    "10:00 AM", "1:30 PM", "7:45 PM", "12:15 PM", "3:55 PM",
    "8:00 AM", "5:30 PM", "2:45 PM", "9:10 AM", "6:25 PM",
    "11:40 AM", "3:20 PM", "7:05 PM", "10:50 AM", "1:15 PM",
    "9:55 AM", "12:35 PM", "6:50 PM", "2:30 PM", "5:10 PM"
];

// Array de Mensajes aleatorios
var Mensajes = [
    "¿Escuchaste sobre la nueva película que sale?",
    "¿Tienes algún plan para el fin de semana?",
    "Acabo de ver esa película, ¡es increíble!",
    "¿Qué tal si nos encontramos en la cafetería?",
    "¿Te gustaría dar un paseo por el parque?",
    "¡Feliz cumpleaños! Espero que tengas un gran día.",
    "He encontrado un nuevo restaurante que deberíamos probar.",
    "¿Has oído hablar del nuevo libro que ha salido?",
    "No puedo decidir qué película ver esta noche.",
    "Hoy es un día especial, ¿qué te parece celebrarlo?",
    "¿Podemos reunirnos más tarde para hablar de ese proyecto?",
    "¿Te gustaría acompañarme a esa conferencia?",
    "Acabo de comprar boletos para ese evento, ¿te gustaría venir?",
    "¿Puedes darme tu opinión sobre este artículo que escribí?",
    "Me encantaría escuchar tus pensamientos sobre este tema.",
    "¿Has probado ese nuevo restaurante de sushi?",
    "¡Es viernes! ¿Qué planes tienes para el fin de semana?"
];

// Obtener los elementos Chat-Preview
var ElementosChatPreview = document.getElementsByClassName("Chat-Preview");

// Actualizar los valores en cada Chat-Preview
for (var i = 0; i < ElementosChatPreview.length; i++) {
    // Generar un índice aleatorio para cada array dentro del bucle
    var IndiceAleatorioNombre = Math.floor(Math.random() * Nombres.length);
    var IndiceAleatorioHora = Math.floor(Math.random() * Horas.length);
    var IndiceAleatorioMensaje = Math.floor(Math.random() * Mensajes.length);
    var NumeroAleatorio = Math.floor(Math.random() * 99) + 1;
    var IndiceAleatorioUsuario = Math.floor(Math.random() * Nombres.length);

    var ElementoNombre = ElementosChatPreview[i].querySelector("#Nombre");
    var ElementoHora = ElementosChatPreview[i].querySelector("#Hora");
    var ElementoMensaje = ElementosChatPreview[i].querySelector(".Mensaje-Preview");
    var ElementoNotificaciones = ElementosChatPreview[i].querySelector(".Notificaciones");
    var ElementoUsuarioActivo = document.getElementById("UsuarioActivo");

    ElementoNombre.textContent = Nombres[IndiceAleatorioNombre];
    ElementoHora.textContent = Horas[IndiceAleatorioHora];
    ElementoMensaje.textContent = Mensajes[IndiceAleatorioMensaje];
    ElementoNotificaciones.textContent = NumeroAleatorio;
    ElementoUsuarioActivo.textContent = Nombres[IndiceAleatorioUsuario];
}

