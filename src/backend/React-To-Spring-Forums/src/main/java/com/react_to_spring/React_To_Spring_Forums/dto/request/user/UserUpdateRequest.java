package com.react_to_spring.React_To_Spring_Forums.dto.request.user;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
    @Size(min = 8, message = "INVALID_PASSWORD")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*(){}\\[\\]!~`|])(?=.*\\d).*$", message = "INVALID_PASSWORD")
    String password;

    String role;
}
