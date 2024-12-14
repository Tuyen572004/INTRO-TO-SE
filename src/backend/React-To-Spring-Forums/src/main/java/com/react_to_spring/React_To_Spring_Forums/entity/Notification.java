package com.react_to_spring.React_To_Spring_Forums.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDateTime;

@Document("notifications")
@Getter
@Setter
@Builder
@AllArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE)
public class Notification {
    @MongoId
    String id;

    @Field("notification_type")
    String notificationType;

    @Field("notification_entity_id")
    String notificationEntityId; // post_id, comment_id,..


    @Field("message")
    String message;

    @Field("actor_id")
    String actorId;

    @Field("send_at")
    LocalDateTime sendAt;


}
