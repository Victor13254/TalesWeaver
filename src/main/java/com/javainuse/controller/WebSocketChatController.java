package com.javainuse.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.javainuse.domain.WebSocketChatMessage;

@Controller
//Controlador de envio y recepcion de mensajes
public class WebSocketChatController {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/javainuse")
    //Envia mensaje y lo devuelve(a los usuarios)
    public WebSocketChatMessage sendMessage(@Payload WebSocketChatMessage webSocketChatMessage) {
        return webSocketChatMessage;
    }

    @MessageMapping("/chat.newUser")
    @SendTo("/topic/javainuse")
    //Se envia el nombre del Usuario y lo retorna
    public WebSocketChatMessage newUser(@Payload WebSocketChatMessage webSocketChatMessage,
                                        SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", webSocketChatMessage.getSender());
        return webSocketChatMessage;
    }

}