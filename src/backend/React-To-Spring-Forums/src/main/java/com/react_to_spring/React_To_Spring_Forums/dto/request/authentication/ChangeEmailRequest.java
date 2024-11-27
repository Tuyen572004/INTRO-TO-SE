package com.react_to_spring.React_To_Spring_Forums.dto.request.authentication;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangeEmailRequest {
    String oldPassword;

    @NotNull(message = "REQUIRED_EMAIL")
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@(.+)$", message = "INVALID_EMAIL")
    String newEmail;

    String verificationCode;
}
