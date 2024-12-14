package com.react_to_spring.React_To_Spring_Forums.dto.response;

import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

public class NotificationRecipientResponse {
    String id;
    String notificationId;
    String recipientId;
    Boolean readStatus = false;
}
