package com.react_to_spring.React_To_Spring_Forums.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDateTime;
import java.util.List;

@Document("messages")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Message {

    @MongoId
    String id;

    @Field("chat_id")
    String chatId;

    @Field("sender_id")
    String senderId;

    @Field("recipient_ids")
    List<String> recipientIds;

    @Field("content")
    String content;

    @Field("images")
    List<String> images;

    @Field("sent_at")
    LocalDateTime sentAt;

    @Field("read_status")
    Boolean readStatus;
}
