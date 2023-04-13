package com.javainuse.domain;

public class WebSocketChatMessage {
    private String type; //Entra o sale del chat
    private String content; //Mensaje
    private String sender; //Emisor


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}
