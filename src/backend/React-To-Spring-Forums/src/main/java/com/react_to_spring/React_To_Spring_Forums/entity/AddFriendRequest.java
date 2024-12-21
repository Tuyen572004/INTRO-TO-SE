package com.react_to_spring.React_To_Spring_Forums.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDateTime;

@Document("add_friend_requests")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddFriendRequest {
    @MongoId
    String id;

    @Field("sending_user_id")
    String sendingUserId;

    @Field("receiving_user_id")
    String receivingUserId;

    @Field("created_at")
    LocalDateTime createdAt;
}