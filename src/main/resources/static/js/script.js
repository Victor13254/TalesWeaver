'use strict';

document.querySelector('#welcomeForm').addEventListener('submit', connect, true)
document.querySelector('#dialogueForm').addEventListener('submit', sendMessage, true)

var stompClient = null;
var name = null;

//conexion
function connect(event) {
    name = document.querySelector('#name').value.trim();

    if (name) {
        document.querySelector('#welcome-page').classList.add('hidden'); //oculta el login
        document.querySelector('#dialogue-page').classList.remove('hidden'); //muestra el chat

        //se hace una conexion BiDir por STOMP
        var socket = new SockJS('/websocketApp');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, connectionSuccess);
    }
    event.preventDefault();
}

function connectionSuccess() {
    //Se sucribe al canal y envia mensaje de entrada
    stompClient.subscribe('/topic/javainuse', onMessageReceived);

    stompClient.send("/app/chat.newUser", {}, JSON.stringify({
        sender : name,
        type : 'newUser'
    }))

}

function sendMessage(event) {
    //envio de mensajes
    var messageContent = document.querySelector('#chatMessage').value.trim(); //seleccion del mensaje

    if (messageContent && stompClient) { //verifica si existe un mensaje y una conexion
        var chatMessage = { //se definen los componentes de la variable
            sender : name,
            content : document.querySelector('#chatMessage').value,
            type : 'CHAT'
        };

        stompClient.send("/app/chat.sendMessage", {}, JSON
            .stringify(chatMessage)); //se envia mensaje a traves de STOMP en formato JSON
        document.querySelector('#chatMessage').value = ''; // borra el mensaje del formato
    }
    event.preventDefault(); //Evita que se realize el evento default
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    //se definen mensajes
    if (message.type === 'newUser') {//entrada
        messageElement.classList.add('event-data');
        message.content = message.sender + ' entro al chat';
    } else if (message.type === 'Leave') {//salida
        messageElement.classList.add('event-data');
        message.content = message.sender + ' salio del chat';
    } else { //se recibe mensajes
        messageElement.classList.add('message-data');

        var element = document.createElement('i');
        var text = document.createTextNode(message.sender[0]);
        element.appendChild(text);

        messageElement.appendChild(element);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    document.querySelector('#messageList').appendChild(messageElement);
    document.querySelector('#messageList').scrollTop = document
        .querySelector('#messageList').scrollHeight;

}