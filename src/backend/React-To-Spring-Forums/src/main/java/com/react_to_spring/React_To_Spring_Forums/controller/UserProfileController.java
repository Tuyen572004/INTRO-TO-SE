package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.userprofile.UserProfileUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserProfileResponse;
import com.react_to_spring.React_To_Spring_Forums.service.userprofile.UserProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-profiles")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "User Profile Controller", description = "APIs for managing user profiles")
public class UserProfileController {

    UserProfileService userProfileService;

    @GetMapping
    @Operation(summary = "Get user profile by user ID",
            description = "Get user profile by user ID")
    public ApiResponse<UserProfileResponse> getUserProfileByUserId(@RequestParam("userId") String userId) {
        return ApiResponse.<UserProfileResponse>builder()
                .data(userProfileService.getUserProfileByUserId(userId))
                .build();
    }

    @GetMapping("/my-profile")
    @Operation(summary = "Get my profile",
            description = "Get my profile")
    public ApiResponse<UserProfileResponse> getMyProfile() {
        return ApiResponse.<UserProfileResponse>builder()
                .data(userProfileService.getMyProfile())
                .build();
    }

    @PutMapping
    @Operation(summary = "Update user profile",
            description = "Update user profile by providing user ID and new information: first name, last name, address, profile image URL")
    public ApiResponse<UserProfileResponse> updateUserProfile(@RequestParam("userId") String userId, @RequestBody UserProfileUpdateRequest request) {
        return ApiResponse.<UserProfileResponse>builder()
                .data(userProfileService.updateUserProfile(userId, request))
                .build();
    }

    @GetMapping("/friends")
    @Operation(summary = "Get friends",
            description = "Get friends with pagination")
    public ApiResponse<PageResponse<UserProfileResponse>> getFriends(@RequestParam("page") int page, @RequestParam("size") int size) {
        return ApiResponse.<PageResponse<UserProfileResponse>>builder()
                .data(userProfileService.getFriends(page, size))
                .build();
    }

    @GetMapping("/all-friends")
    @Operation(summary = "Get all friends",
            description = "Get all friends")
    public ApiResponse<List<UserProfileResponse>> getAllFriends() {
        return ApiResponse.<List<UserProfileResponse>>builder()
                .data(userProfileService.getAllFriends())
                .build();
    }

}
