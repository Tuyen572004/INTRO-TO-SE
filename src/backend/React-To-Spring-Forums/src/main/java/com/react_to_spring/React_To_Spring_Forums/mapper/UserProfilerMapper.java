package com.react_to_spring.React_To_Spring_Forums.mapper;

import com.react_to_spring.React_To_Spring_Forums.dto.request.user.UserCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.userprofile.UserProfileCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.userprofile.UserProfileUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserProfileResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserProfilerMapper {
    UserProfile toUserProfile(UserProfileCreationRequest request);

    UserProfileCreationRequest toUserProfileCreationRequest(UserCreationRequest request);

    void updateUserProfile(@MappingTarget UserProfile userProfile, UserProfileUpdateRequest request);

    UserProfileResponse toUserProfileResponse(UserProfile userProfile);
}
