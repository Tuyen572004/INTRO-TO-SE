package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.user.UserCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.SearchUserResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserResponse;
import com.react_to_spring.React_To_Spring_Forums.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "User Controller", description = "APIs for user management")
public class UserController {
    UserService userService;

    @NonFinal
    @Value("${app.controller.user.response.delete.success}")
    String DELETE_SUCCESS;

    @PostMapping
    @Operation(summary = "Create a new user",
            description = "Create a new user's account and user's profile with the provided details")
    public ApiResponse<UserResponse> createUser(@Valid @RequestBody UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .data(userService.createUser(request))
                .build();
    }

    @GetMapping
    @Operation(summary = "Get information of user's account by ID",
            description = "Get information of user's account  by providing the user ID")
    public ApiResponse<UserResponse> getUserById(@RequestParam("id") String id) {
        return ApiResponse.<UserResponse>builder()
                .data(userService.getUserById(id))
                .build();
    }

    @GetMapping("/my-account")
    @Operation(summary = "Get information of my account",
            description = "Get information of my account")
    public ApiResponse<UserResponse> getMyAccount() {
        return ApiResponse.<UserResponse>builder()
                .data(userService.getMyAccount())
                .build();
    }

    @GetMapping("/pagination")
    @Operation(summary = "Get a list of users with pagination",
            description = "Get a list of users with pagination by providing the page number and the size of the page")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<PageResponse<UserResponse>> getUsers(@RequestParam("page") int page, @RequestParam("size") int size) {
        return ApiResponse.<PageResponse<UserResponse>>builder()
                .data(userService.getUsers(page, size))
                .build();
    }

    @GetMapping("/all")
    @Operation(summary = "Get all users",
            description = "Get all users")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<UserResponse>> getAllUsers() {
        return ApiResponse.<List<UserResponse>>builder()
                .data(userService.getAllUsers())
                .build();
    }

    @DeleteMapping()
    @Operation(summary = "Delete a user",
            description = "Delete a user by providing the user ID")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> deleteUser(@RequestParam("id") String id) {
        userService.deleteUser(id);
        return ApiResponse.<Void>builder()
                .message(DELETE_SUCCESS)
                .build();
    }

    @GetMapping("/username/{text}")
    @Operation(summary = "Search for a user by username",
            description = "Search for a user by username")
    public ApiResponse<List<SearchUserResponse>> searchUser(@PathVariable("text") String text) {
        return ApiResponse.<List<SearchUserResponse>>builder()
                .data(userService.searchUserbyUsernameContaining(text))
                .build();
    }


    @GetMapping("/count")
    @Operation(summary = "Get the number of users",
            description = "Get the number of users")
    public ApiResponse<Long> getUserCount() {
        return ApiResponse.<Long>builder()
                .data(userService.getUserCount())
                .build();
    }
}
