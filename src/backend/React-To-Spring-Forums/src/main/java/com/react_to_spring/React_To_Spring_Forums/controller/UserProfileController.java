package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.userprofile.UserProfileUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserProfileResponse;
import com.react_to_spring.React_To_Spring_Forums.service.userprofile.UserProfileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-profiles")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserProfileController {

    UserProfileService userProfileService;

    @GetMapping
    public ApiResponse<UserProfileResponse> getUserProfileByUserId(@RequestParam("userId") String userId) {
        return ApiResponse.<UserProfileResponse>builder()
                .data(userProfileService.getUserProfileByUserId(userId))
                .build();
    }

    @PutMapping
    public ApiResponse<UserProfileResponse> updateUserProfile(@RequestParam("userId") String userId, @RequestBody UserProfileUpdateRequest request) {
        return ApiResponse.<UserProfileResponse>builder()
                .data(userProfileService.updateUserProfile(userId, request))
                .build();
    }

}
