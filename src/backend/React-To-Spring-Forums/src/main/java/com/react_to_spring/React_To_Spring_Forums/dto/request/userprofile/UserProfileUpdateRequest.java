package com.react_to_spring.React_To_Spring_Forums.dto.request.userprofile;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProfileUpdateRequest {
        String firstName;
        String lastName;
        String address;
        String profileImgUrl;
}
