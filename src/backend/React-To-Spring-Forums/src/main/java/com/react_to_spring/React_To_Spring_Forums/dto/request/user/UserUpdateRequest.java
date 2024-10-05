package com.react_to_spring.React_To_Spring_Forums.dto.request.user;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserUpdateRequest {
    String password;

    String role;
}
