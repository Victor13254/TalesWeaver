package com.javainuse.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker

//Configuracion de WebSocket con RabbitMQ
public class WebSocketChatConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    //Punto de conexion
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/websocketApp").withSockJS();
    }

    @Override
    //Se configura el mensaje y el enrutamiento
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableStompBrokerRelay("/topic").setRelayHost("localhost").setRelayPort(61613).setClientLogin("guest")
                .setClientPasscode("guest");

    }
}
