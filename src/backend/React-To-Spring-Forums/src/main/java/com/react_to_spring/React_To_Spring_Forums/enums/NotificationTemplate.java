package com.react_to_spring.React_To_Spring_Forums.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum NotificationTemplate {

    CREATE_POST("POST", "created", "User %s %s a new post"),
    CREATE_COMMENT("COMMENT", "commented on", "User %s %s your post"),
    CREATE_REACT_TO_POST("POST", "reacted to", "User %s %s your post"),
    CREATE_MESSAGE("MESSAGE", "sent", "User %s %s you a message"),
    SEND_ADD_FRIEND_REQUEST("ADD_FRIEND", "sent", "User %s %s a friend request to you"),
    ACCEPT_FRIEND_REQUEST("USER", "accepted", "User %s %s your friend request"),

    SEND_REPORT_REQUEST("REPORT", "reported", "User %s %s a post"),
    ACCEPT_REPORT_REQUEST("REPORT", "accepted", "Admin%s %s your report. Thank you for your vigilance"),
    DELETE_POST("DELETED_POST", "deleted", "Admin%s %s your post for violating the community guidelines");

    private final String entity;        // The entity involved (e.g., Post, Comment, User)
    private final String action;        // The action performed (e.g., created, reacted, commented)
    private final String template;      // The notification message template

    public String formatMessage(String actorName) {
        return String.format(template, actorName, action);
    }

}
