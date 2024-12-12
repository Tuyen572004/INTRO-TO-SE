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
    String notificationType; // POST, COMMENT,..
    String notificationEntityId; // PostId, CommentId,..
    String actorId;
    String formattedSentTime;
}

