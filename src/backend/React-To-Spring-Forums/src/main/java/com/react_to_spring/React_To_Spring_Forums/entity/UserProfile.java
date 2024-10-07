package com.react_to_spring.React_To_Spring_Forums.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Document(value = "user_profiles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProfile {

    @MongoId
    String id;

    @Field("user_id")
    String userId;

    @Field("first_name")
    String firstName;

    @Field("last_name")
    String lastName;

    @Field("address")
    String address;

    @Field("profile_img_url")
    String profileImgUrl;

    @Field("friend_ids")
    List<String> friendIds;
}
