package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.user.UserCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserResponse;
import com.react_to_spring.React_To_Spring_Forums.service.user.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @NonFinal
    @Value("${app.controller.user.response.delete.success}")
    String DELETE_SUCCESS;

    @PostMapping
    public ApiResponse<UserResponse> createUser(@RequestBody UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .data(userService.createUser(request))
                .build();
    }

    @GetMapping
    public ApiResponse<UserResponse> getUserById(@RequestParam("id") String id) {
        return ApiResponse.<UserResponse>builder()
                .data(userService.getUserById(id))
                .build();
    }

    @GetMapping("/pagination")
    public ApiResponse<PageResponse<UserResponse>> getUsers(@RequestParam("page") int page, @RequestParam("size") int size) {
        return ApiResponse.<PageResponse<UserResponse>>builder()
                .data(userService.getUsers(page, size))
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<List<UserResponse>> getAllUsers() {
        return ApiResponse.<List<UserResponse>>builder()
                .data(userService.getAllUsers())
                .build();
    }

    @DeleteMapping()
    public ApiResponse<Void> deleteUser(@RequestParam("id") String id) {
        userService.deleteUser(id);
        return ApiResponse.<Void>builder()
                .message(DELETE_SUCCESS)
                .build();
    }
}
