package com.react_to_spring.React_To_Spring_Forums.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum NotificationTemplate {

    CREATE_POST("Post", "created", "User %s %s a new post"),
    CREATE_COMMENT("Comment", "commented on", "User %s %s your post"),
    CREATE_REACT_TO_POST("Post", "reacted to", "User %s %s your post"),
    SEND_ADD_FRIEND_REQUEST("User", "sent", "User %s %s a friend request to you"), // HAVEN'T IMPLEMENTED YET
    ACCEPT_FRIEND_REQUEST("User", "accepted", "User %s %s your friend request"); // HAVEN'T IMPLEMENTED YET

    private final String entity;        // The entity involved (e.g., Post, Comment, User)
    private final String action;        // The action performed (e.g., created, reacted, commented)
    private final String template;      // The notification message template

//    public String formatMessage(String actorName, String targetName) {
//        return String.format(template, actorName, targetName);
//    }

    // Overloaded method with only actorName
    public String formatMessage(String actorName) {
        return formatMessage(actorName); // Default targetName
    }

}
