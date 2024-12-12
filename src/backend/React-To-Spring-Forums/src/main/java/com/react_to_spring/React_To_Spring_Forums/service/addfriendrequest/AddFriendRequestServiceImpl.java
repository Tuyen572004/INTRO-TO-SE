package com.react_to_spring.React_To_Spring_Forums.service.addfriendrequest;

import com.react_to_spring.React_To_Spring_Forums.dto.response.AddFriendRequestResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.AddFriendRequest;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.repository.AddFriendRequestRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserProfileRepository;
import com.react_to_spring.React_To_Spring_Forums.service.notification.NotificationService;
import com.react_to_spring.React_To_Spring_Forums.service.userprofile.UserProfileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.react_to_spring.React_To_Spring_Forums.dto.request.addfriend.ResponseAddFriendRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddFriendRequestServiceImpl implements AddFriendRequestService {

    UserProfileRepository userProfileRepository;
    AddFriendRequestRepository addFriendRequestRepository;

    UserProfileService userProfileService;
    NotificationService notificationService;

    @Override
    public void sendAddFriendRequest(String friendId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(Objects.equals(friendId, authentication.getName())) {
            throw new AppException(ErrorCode.CANNOT_ADD_YOURSELF_AS_FRIEND);
        }
        if(addFriendRequestRepository.existsBySendingUserIdAndReceivingUserId(authentication.getName(), friendId)) {
            throw new AppException(ErrorCode.ALREADY_SENT_ADD_FRIEND_REQUEST);
        }
        List<String> friends = userProfileRepository.findByUserId(authentication.getName())
                .orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND))
                .getFriendIds();
        if(friends == null) {
            friends = new ArrayList<>();
        }
        if (friends.contains(friendId)) {
            throw new AppException(ErrorCode.ALREADY_FRIEND);
        }

        AddFriendRequest addFriendRequest = AddFriendRequest.builder()
                .sendingUserId(authentication.getName())
                .receivingUserId(friendId)
                .build();

        addFriendRequest =  addFriendRequestRepository.save(addFriendRequest);

        notificationService.sendAddFriendNotification(authentication.getName(), addFriendRequest.getId());
    }

    @Override
    public void responseAddFriendRequest(ResponseAddFriendRequest request) {
        log.info(request.toString());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(!addFriendRequestRepository.existsBySendingUserIdAndReceivingUserId(request.getFriendId(), authentication.getName())) {
            throw new AppException(ErrorCode.ADD_FRIEND_REQUEST_NOT_FOUND);
        }

        addFriendRequestRepository.deleteBySendingUserIdAndReceivingUserId(
                request.getFriendId(), authentication.getName());

        if (request.isAccepted()) {
            userProfileService.addFriend(authentication.getName(), request.getFriendId());
            userProfileService.addFriend(request.getFriendId(), authentication.getName());
            //notificationService.sendAcceptFriendNotification(authentication.getName(), request.getFriendId());
        }
    }

    @Override
    public PageResponse<AddFriendRequestResponse> getAllOfMyAddFriendRequests(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Page<AddFriendRequest> addFriendRequests =
                addFriendRequestRepository.findAllByReceivingUserId(authentication.getName(), pageable);
        List<AddFriendRequest> addFriendRequestList = addFriendRequests.getContent();
        List<AddFriendRequestResponse> addFriendRequestResponseList = new ArrayList<>();

        for(AddFriendRequest addFriendRequest : addFriendRequestList){
            AddFriendRequestResponse addFriendRequestResponse = new AddFriendRequestResponse();

            UserProfile userProfile = userProfileRepository.findByUserId(addFriendRequest.getSendingUserId())
                    .orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND));
            addFriendRequestResponse.setSendingUserName(
                    String.format("%s %s", userProfile.getFirstName(), userProfile.getLastName()));

            addFriendRequestResponse.setSendingUserId(addFriendRequest.getSendingUserId());
            addFriendRequestResponse.setReceivingUserId(addFriendRequest.getReceivingUserId());
            addFriendRequestResponseList.add(addFriendRequestResponse);
        }
        return PageResponse.<AddFriendRequestResponse>builder()
                .page(page)
                .size(size)
                .totalElements(addFriendRequests.getTotalElements())
                .totalPages(addFriendRequests.getTotalPages())
                .data(addFriendRequestResponseList)
                .build();
    }

    @Override
    public void unfriend(String friendId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        userProfileService.unfriend(authentication.getName(), friendId);
    }

    @Override
    public void unsendAddFriendRequest(String friendId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        addFriendRequestRepository.deleteBySendingUserIdAndReceivingUserId(authentication.getName(), friendId);
    }

    @Override
    public boolean isFriend(String friendId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<String> friends = userProfileRepository.findByUserId(authentication.getName())
                .orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND))
                .getFriendIds();
        return friends != null && friends.contains(friendId);
    }

    @Override
    public boolean isAddFriendRequestSent(String friendId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return addFriendRequestRepository.existsBySendingUserIdAndReceivingUserId(authentication.getName(), friendId);
    }
}
