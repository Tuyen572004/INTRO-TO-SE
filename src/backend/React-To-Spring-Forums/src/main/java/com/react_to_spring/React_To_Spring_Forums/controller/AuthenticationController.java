package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.authentication.*;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.AuthenticationResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.IntrospectResponse;
import com.react_to_spring.React_To_Spring_Forums.service.authentication.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Authentication Controller", description = "APIs for managing user authentication")
public class AuthenticationController {
    AuthenticationService authenticationService;

    @NonFinal
    @Value("${app.controller.authentication.response.logout.success}")
    String LOGOUT_SUCCESS_MESSAGE;

    @NonFinal
    @Value("${app.controller.authentication.response.change-password.success}")
    String CHANGE_PASSWORD_SUCCESS_MESSAGE;

    @PostMapping("/introspect")
    @Operation(summary = "Introspect token",
            description = "Introspect token to see if it is valid or not")
    public ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) {
        return ApiResponse.<IntrospectResponse>builder()
                .data(authenticationService.introspect(request))
                .build();
    }

    @PostMapping
    @Operation(summary = "Authenticate user",
            description = "Authenticate user with username and password and get access token, refresh token")
    public ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ApiResponse.<AuthenticationResponse>builder()
                .data(authenticationService.authenticate(request))
                .build();
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh token",
            description = "Refresh token with refresh token and get new access token, refresh token")
    public ApiResponse<AuthenticationResponse> refresh(@RequestBody RefreshTokenRequest request) {
        return ApiResponse.<AuthenticationResponse>builder()
                .data(authenticationService.refresh(request))
                .build();
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout",
            description = "Logout user by invalidating access token and refresh token")
    public ApiResponse<Void> logout(@RequestBody LogoutRequest request) {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder().message(LOGOUT_SUCCESS_MESSAGE).build();
    }

    @PatchMapping("/change-password")
    @Operation(summary = "Change password",
            description = "Change password of user with old password and new password")
    public ApiResponse<Void> changePassword(@RequestBody ChangePasswordRequest request) {
        authenticationService.changePassword(request);
        return ApiResponse.<Void>builder().message(CHANGE_PASSWORD_SUCCESS_MESSAGE).build();
    }
}
