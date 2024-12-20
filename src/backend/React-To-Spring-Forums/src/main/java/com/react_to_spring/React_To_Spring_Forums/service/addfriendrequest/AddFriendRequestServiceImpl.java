package com.react_to_spring.React_To_Spring_Forums.service.addfriendrequest;

import com.react_to_spring.React_To_Spring_Forums.dto.response.AddFriendRequestResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserInfoResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.AddFriendRequest;
import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.repository.AddFriendRequestRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserProfileRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
import com.react_to_spring.React_To_Spring_Forums.service.notification.NotificationService;
import com.react_to_spring.React_To_Spring_Forums.service.userprofile.UserProfileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.react_to_spring.React_To_Spring_Forums.dto.request.addfriend.ResponseAddFriendRequest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddFriendRequestServiceImpl implements AddFriendRequestService {

    UserRepository userRepository;
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

        boolean isAddFriendRequestReceived = addFriendRequestRepository.existsBySendingUserIdAndReceivingUserId(friendId, authentication.getName());
        if(isAddFriendRequestReceived) {
            throw new AppException(ErrorCode.ALREADY_RECEIVED_ADD_FRIEND_REQUEST);
        }

        AddFriendRequest addFriendRequest = AddFriendRequest.builder()
                .sendingUserId(authentication.getName())
                .receivingUserId(friendId)
                .createdAt(LocalDateTime.now())
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
            notificationService.sendAcceptFriendNotification(authentication.getName(), request.getFriendId());
        }
    }

    @Override
    public PageResponse<UserInfoResponse> getAllOfMyAddFriendRequests(String type, int page, int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        Sort sort = Sort.by(Sort.Order.desc("createdAt"));
        Pageable pageable = PageRequest.of(page - 1, size, sort);

        List<String> friendIds = new ArrayList<>();

        Page<AddFriendRequest> addFriendRequests = null;

        if (type.equals("RECEIVED")) {
            addFriendRequests = addFriendRequestRepository.findAllByReceivingUserId(userId, pageable);
            for (AddFriendRequest item : addFriendRequests.getContent()) {
                friendIds.add(item.getSendingUserId());
            }
        } else if (type.equals("SENT")) {
            addFriendRequests = addFriendRequestRepository.findAllBySendingUserId(userId, pageable);
            for (AddFriendRequest item : addFriendRequests.getContent()) {
                friendIds.add(item.getReceivingUserId());
            }
        }

        List<UserInfoResponse> responses = new ArrayList<>();
        for (String id : friendIds) {
            UserProfile friendProfile = userProfileRepository.findByUserId(id)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND));
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

            UserInfoResponse userInfo = UserInfoResponse.builder()
                    .id(user.getId())
                    .name(friendProfile.getFirstName() + " " + friendProfile.getLastName())
                    .username(user.getUsername())
                    .avatar(friendProfile.getProfileImgUrl())
                    .build();

            responses.add(userInfo);
        }


        return PageResponse.<UserInfoResponse>builder()
                .page(page)
                .size(size)
                .totalElements(addFriendRequests.getTotalElements())
                .totalPages(addFriendRequests.getTotalPages())
                .data(responses)
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
    public String isFriend(String friendId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<String> friends = userProfileRepository.findByUserId(authentication.getName())
                .orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND))
                .getFriendIds();

        String result = "";
        if(friends != null && friends.contains(friendId)) {
            result = "FRIEND";
        } else {
            boolean isAddFriendRequestSent = addFriendRequestRepository.existsBySendingUserIdAndReceivingUserId(authentication.getName(), friendId);
            boolean isAddFriendRequestReceived = addFriendRequestRepository.existsBySendingUserIdAndReceivingUserId(friendId, authentication.getName());

            if(isAddFriendRequestSent) {
                result = "ADD_FRIEND_REQUEST_SENT";
            }else if(isAddFriendRequestReceived) {
                result = "ADD_FRIEND_REQUEST_RECEIVED";
            } else {
                result = "NOT_FRIEND";
            }
        }

        return result;
    }

    @Override
    public boolean isAddFriendRequestSent(String friendId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return addFriendRequestRepository.existsBySendingUserIdAndReceivingUserId(authentication.getName(), friendId);
    }
}
