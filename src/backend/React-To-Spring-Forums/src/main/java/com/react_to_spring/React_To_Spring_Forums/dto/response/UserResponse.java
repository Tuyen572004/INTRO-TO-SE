package com.react_to_spring.React_To_Spring_Forums.dto.response;

import com.react_to_spring.React_To_Spring_Forums.entity.Role;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String username;
    String email;
    Role role;
}
