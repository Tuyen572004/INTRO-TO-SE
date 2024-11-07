package com.react_to_spring.React_To_Spring_Forums.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDateTime;
import java.util.List;

@Document("comments")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Comment {
    @MongoId
    String id;

    @Field(name = "user_id")
    String userId;

    @Field(name = "post_id")
    String postId;

    @Field(name = "content")
    String content;

    @Field(name = "image_url")
    List<String> imageUrls;

    @Field(name = "created_date")
    LocalDateTime createdDate;
}
