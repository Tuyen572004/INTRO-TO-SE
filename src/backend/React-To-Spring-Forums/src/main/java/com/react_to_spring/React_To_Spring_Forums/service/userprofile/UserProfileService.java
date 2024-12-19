package com.react_to_spring.React_To_Spring_Forums.service.userprofile;

import com.react_to_spring.React_To_Spring_Forums.dto.request.userprofile.UserProfileCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.userprofile.UserProfileUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserProfileResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;

import java.util.List;

public interface UserProfileService {

    UserProfileResponse createUserProfile(UserProfileCreationRequest request);

    UserProfileResponse getUserProfileByUserId(String userId);

    UserProfileResponse getMyProfile();

    PageResponse<UserProfileResponse> getUserProfiles(int page, int size);

    UserProfileResponse updateUserProfile(String userId, UserProfileUpdateRequest request);

    void deleteUserProfileByUserId(String userId);

    void addFriend(String userId, String friendId);

    void unfriend(String userId, String friendId);

    PageResponse<UserProfileResponse> getFriends(int page, int size);

    List<UserProfileResponse> getAllFriends();
}
