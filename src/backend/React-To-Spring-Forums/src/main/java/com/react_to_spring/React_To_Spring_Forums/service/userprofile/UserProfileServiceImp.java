package com.react_to_spring.React_To_Spring_Forums.service.userprofile;

import com.react_to_spring.React_To_Spring_Forums.dto.request.userprofile.UserProfileCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.userprofile.UserProfileUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserProfileResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.UserProfilerMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.UserProfileRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserProfileServiceImp implements UserProfileService{

    UserProfileRepository userProfileRepository;

    UserProfilerMapper userProfilerMapper;

    @Override
    @PostAuthorize("returnObject.userId == authentication.name")
    public UserProfileResponse getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserProfile userProfile = userProfileRepository.findByUserId(authentication.getName())
                .orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND));

        return userProfilerMapper.toUserProfileResponse(userProfile);
    }

    @Override
    public UserProfileResponse createUserProfile(UserProfileCreationRequest request) {
        if (userProfileRepository.existsByUserId(request.getUserId())) {
            throw new AppException(ErrorCode.USER_PROFILE_EXISTED);
        }

        UserProfile userProfile = userProfilerMapper.toUserProfile(request);

        userProfile = userProfileRepository.save(userProfile);

        return userProfilerMapper.toUserProfileResponse(userProfile);
    }

    @Override
    public UserProfileResponse getUserProfileByUserId(String userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND));

        return userProfilerMapper.toUserProfileResponse(userProfile);
    }

    @Override
    public PageResponse<UserProfileResponse> getUserProfiles(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<UserProfile> userProfiles = userProfileRepository.findAll(pageable);
        List<UserProfileResponse> userProfileResponses = userProfiles.map(userProfilerMapper::toUserProfileResponse).getContent();

        return PageResponse.<UserProfileResponse>builder()
                .page(page)
                .size(size)
                .totalElements(userProfiles.getTotalElements())
                .totalPages(userProfiles.getTotalPages())
                .data(userProfileResponses)
                .build();
    }

    @Override
    public UserProfileResponse updateUserProfile(String userId, UserProfileUpdateRequest request) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND));

        if (request.getFirstName() != null && request.getFirstName().isEmpty()) {
            throw new AppException(ErrorCode.FIRST_NAME_IS_EMPTY);
        }

        if (request.getLastName() != null && request.getLastName().isEmpty()) {
            throw new AppException(ErrorCode.LAST_NAME_IS_EMPTY);
        }

        userProfilerMapper.updateUserProfile(userProfile, request);

        userProfile = userProfileRepository.save(userProfile);

        return userProfilerMapper.toUserProfileResponse(userProfile);
    }

    @Override
    public void deleteUserProfileByUserId(String userId) {
        userProfileRepository.deleteUserProfileByUserId(userId);
    }

    @Override
    public void addFriend(String userId, String friendId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND));
        List<String> friendIds = userProfile.getFriendIds();

        if(friendIds == null){
            friendIds = new ArrayList<>();
        }

        friendIds.add(friendId);
        userProfile.setFriendIds(friendIds);
        userProfileRepository.save(userProfile);
    }

    @Override
    public void unfriend(String userId, String friendId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND));
        List<String> friendIds = userProfile.getFriendIds();
        if(friendIds == null || !friendIds.contains(friendId)){
            throw new AppException(ErrorCode.FRIEND_NOT_FOUND);
        }
        friendIds.remove(friendId);
        userProfile.setFriendIds(friendIds);
        userProfileRepository.save(userProfile);
    }
}
