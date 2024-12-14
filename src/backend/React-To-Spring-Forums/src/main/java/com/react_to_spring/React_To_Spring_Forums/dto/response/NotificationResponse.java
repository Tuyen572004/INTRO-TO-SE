package com.react_to_spring.React_To_Spring_Forums.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@FieldDefaults(level= AccessLevel.PRIVATE)
public class NotificationResponse {
    String id;
    String message;
    String notificationType; // POST, COMMENT, REPORT, DELETE_POST
    String notificationEntityId; // postId, commentId, reportId, post reported id (postId)
    String actorId;
    String formattedSentTime;
}

