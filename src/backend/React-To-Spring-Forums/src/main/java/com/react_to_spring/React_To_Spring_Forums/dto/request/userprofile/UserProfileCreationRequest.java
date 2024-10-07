package com.react_to_spring.React_To_Spring_Forums.dto.request.userprofile;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProfileCreationRequest {
        String userId;
        String firstName;
        String lastName;
        String address;
}
