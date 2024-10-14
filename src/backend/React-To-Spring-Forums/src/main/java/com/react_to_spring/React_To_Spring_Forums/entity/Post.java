package com.react_to_spring.React_To_Spring_Forums.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.sql.Date;

@Document("posts")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Post {
    @MongoId
    String id;

    @Field(name = "user_id")
    String userId;

    @Field(name = "title")
    String title;

    @Field(name = "content")
    String content;

    @Field(name = "image_url")
    String imageURL;

    @Field(name = "created_date")
    Date createdDate;

    @Field(name = "react_counts")
    Integer reactCounts;
}
