package com.react_to_spring.React_To_Spring_Forums.entity;

import com.react_to_spring.React_To_Spring_Forums.enums.ReactName;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document("reacts")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class React {
    @MongoId
    String id;

    @Field(name = "name")
    ReactName name;

    @Field(name = "user_id")
    String userId;

    @Field(name = "post_id")
    String postId;

    @Field(name = "created_date")
    LocalDateTime createdDate;
}
