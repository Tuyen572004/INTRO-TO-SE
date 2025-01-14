package com.react_to_spring.React_To_Spring_Forums.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProfileResponse {
    String id;
    String userId;
    String firstName;
    String lastName;
    String address;
    @Builder.Default
    String profileImgUrl = "https://res.cloudinary.com/duf2t1pkp/image/upload/v1736754684/User_Icon_e0jwww.png";
    List<String> friendIds;
}
