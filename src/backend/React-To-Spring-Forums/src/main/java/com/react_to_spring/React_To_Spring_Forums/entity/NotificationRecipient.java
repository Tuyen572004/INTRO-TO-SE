package com.react_to_spring.React_To_Spring_Forums.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDateTime;

@Document("notification_receivers")
@Getter
@Setter
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationRecipient {
    @MongoId
    String id;

    @Field("notification_id")
    String notificationId;

    @Field("recipient_id")
    String recipientId;

    @Field("read_status")
    Boolean readStatus = false;

    @Field("send_at")
    LocalDateTime sendAt;
}
