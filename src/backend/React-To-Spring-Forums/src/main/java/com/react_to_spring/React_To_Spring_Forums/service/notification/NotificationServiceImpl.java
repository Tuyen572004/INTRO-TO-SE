package com.react_to_spring.React_To_Spring_Forums.service.notification;

import com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost.ResponseReportViolatingPostRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.NotificationRecipientResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.NotificationResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserInfoResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Notification;
import com.react_to_spring.React_To_Spring_Forums.entity.NotificationRecipient;
import com.react_to_spring.React_To_Spring_Forums.entity.User;

import com.react_to_spring.React_To_Spring_Forums.entity.*;
import com.react_to_spring.React_To_Spring_Forums.enums.NotificationTemplate;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.NotificationMapper;
import com.react_to_spring.React_To_Spring_Forums.mapper.NotificationRecipientMapper;

import com.react_to_spring.React_To_Spring_Forums.repository.*;
import com.react_to_spring.React_To_Spring_Forums.utils.formatter.DateFormatter;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    UserRepository userRepository;
    UserProfileRepository userProfileRepository;
    ReportViolatingPostRequestRepository reportViolatingPostRequestRepository;
    AddFriendRequestRepository addFriendRequestRepository;
    NotificationRecipientMapper notificationRecipientMapper;
    CommentRepository commentRepository;

    @NonFinal
    String defaultSortField = "sendAt";

    NotificationRepository notificationRepository;
    NotificationRecipientRepository notificationRecipientRepository;

    DateFormatter dateFormatter;
    NotificationMapper notificationMapper;

    SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public void sendNotification(Notification notification, List<String> recipientIds) {
        List<NotificationRecipient> recipients = recipientIds.stream()
                .map(recipientId -> NotificationRecipient.builder()
                        .notificationId(notification.getId())
                        .recipientId(recipientId)
                        .sendAt(notification.getSendAt())
                        .build())
                .collect(Collectors.toList());
        notificationRecipientRepository.saveAll(recipients);

        UserInfoResponse actor = buildUserInfoResponse(notification.getActorId());

        recipientIds.forEach(recipientId -> {
            NotificationResponse notificationResponse = notificationMapper.toNotificationResponse(notification);
            notificationResponse.setFormattedSentTime(dateFormatter.format(notification.getSendAt()));
            notificationResponse.setActor(actor);
            simpMessagingTemplate.convertAndSendToUser(recipientId, "/queue/notifications", notificationResponse);
        });
    }

    private UserInfoResponse buildUserInfoResponse(String userId) {
        UserInfoResponse userInfo = UserInfoResponse.builder().name("").username("").avatar("").build();
        userInfo.setId(userId);

        Optional<UserProfile> userProfile = userProfileRepository.findByUserId(userId);
        Optional<User> user = userRepository.findById(userId);

        if (userProfile.isEmpty() || user.isEmpty()) return null;

        userProfile.ifPresent(value -> {
            userInfo.setName(value.getFirstName() + " " + value.getLastName());
            userInfo.setAvatar(value.getProfileImgUrl());
        });

        user.ifPresent(value -> {
            userInfo.setUsername(value.getUsername());
        });

        return userInfo;
    }

    @Override
    public PageResponse<NotificationResponse> findNotifications(int page, int size) {
        Sort sort = Sort.by(Sort.Order.desc(defaultSortField));
        Pageable pageable = PageRequest.of(page - 1, size, sort);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        Page<NotificationRecipient> notificationRecipients = notificationRecipientRepository.findAllByRecipientId(userId, pageable);

        List<NotificationResponse> notificationResponses = notificationRecipients.getContent().stream()
                .map(notificationRecipient -> {
                    Notification notification = notificationRepository.findById(notificationRecipient.getNotificationId())
                            .orElseThrow(() -> new AppException(ErrorCode.NOTIFICATION_NOT_FOUND));

                    NotificationResponse notificationResponse = notificationMapper.toNotificationResponse(notification);
                    notificationResponse.setFormattedSentTime(dateFormatter.format(notification.getSendAt()));

                    UserInfoResponse userInfo = buildUserInfoResponse(notification.getActorId());
                    if(userInfo == null){
                        throw new AppException(ErrorCode.ACTOR_NOT_FOUND);
                    }

                    notificationResponse.setActor(userInfo);

                    if (userInfo.getId().equals(userId)) {
                        return null;
                    }

                    return notificationResponse;
                })
                .filter(Objects::nonNull)
                .toList();

        return PageResponse.<NotificationResponse>builder()
                .page(page)
                .size(size)
                .totalElements(notificationRecipients.getTotalElements())
                .totalPages(notificationRecipients.getTotalPages())
                .data(notificationResponses)
                .build();
    }

    @Override
    public NotificationRecipientResponse markAsRead(String notificationId) {
        NotificationRecipient notificationRecipient = notificationRecipientRepository.findById(notificationId)
                .orElseThrow(() -> new AppException(ErrorCode.NOTIFICATION_RECIPIENT_NOT_FOUND));
        notificationRecipient.setReadStatus(true);
        notificationRecipientRepository.save(notificationRecipient);
        return notificationRecipientMapper.toNotificationRecipientResponse(notificationRecipient);
    }

    private void sendNotification(NotificationTemplate template, String userId, String notificationEntityId, List<String> additionalRecipients, boolean includeAdmin, boolean isAnonymous) {
        String userName = isAnonymous ? "" : userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getUsername();

        String message = template.formatMessage(userName);

        Notification notification = Notification.builder()
                .actorId(userId)
                .notificationType(template.getEntity())
                .notificationEntityId(notificationEntityId)
                .message(message)
                .sendAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);

        List<String> recipientIds = new ArrayList<>();
        if (!isAnonymous) {
            UserProfile userProfile = userProfileRepository.findByUserId(userId).orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND));
            List<String> friendIds = userProfile.getFriendIds();
            if(friendIds!=null){
                recipientIds.addAll(friendIds);
            }

        }

        if (includeAdmin) {
            recipientIds.addAll(userRepository.findByRole_Name("ADMIN").stream().map(User::getId).toList());
        }

        if (additionalRecipients != null) {
            recipientIds.addAll(additionalRecipients);
        }

        sendNotification(notification, recipientIds);
    }

    @Override
    public void sendPostCreationNotification(String userId, String postId) {
        sendNotification(NotificationTemplate.CREATE_POST, userId, postId, null, true, false);
    }

    @Override
    public void sendCommentCreationNotification(String userId, String postOwnerId, String commentId) {
        sendNotification(NotificationTemplate.CREATE_COMMENT, userId, commentId, List.of(postOwnerId), false, true);
    }

    @Override
    public void sendReactToPostCreationNotification(String userId, String postOwnerId, String reactId) {
        sendNotification(NotificationTemplate.CREATE_REACT_TO_POST, userId, reactId, List.of(postOwnerId), false, true);
    }

    @Override
    public void sendAddFriendNotification(String userId, String addFriendRequestId) {
        AddFriendRequest addFriendRequest = addFriendRequestRepository.findById(addFriendRequestId)
                .orElseThrow(() -> new AppException(ErrorCode.ADD_FRIEND_REQUEST_NOT_FOUND));
        User friend = userRepository.findById(addFriendRequest.getReceivingUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        sendNotification(NotificationTemplate.SEND_ADD_FRIEND_REQUEST, userId, addFriendRequestId, List.of(friend.getId()), false, true);
    }

    @Override
    public void sendAcceptFriendNotification(String userId, String friendId) {
        sendNotification(NotificationTemplate.ACCEPT_FRIEND_REQUEST, userId, userId, List.of(friendId), false, true);
    }

    @Override
    public void sendMessageNotification(String userId, String recipient, String messageId) {
        sendNotification(NotificationTemplate.CREATE_MESSAGE, userId, messageId, List.of(recipient), false, true);
    }

    @Override
    public void sendReportViolatingPostNotification(String userId, String reportId) {
        sendNotification(NotificationTemplate.SEND_REPORT_REQUEST, userId, reportId, null, true, true);
    }

    @Override
    public void sendAcceptReportViolatingPostNotification(String adminId, String reportId) {
        ReportViolatingPostRequest report = reportViolatingPostRequestRepository.findById(reportId)
                .orElseThrow(() -> new AppException(ErrorCode.REPORT_VIOLATING_POST_NOT_FOUND));
        sendNotification(NotificationTemplate.ACCEPT_REPORT_REQUEST, adminId, reportId, List.of(report.getSendingUserId()), false, true);
    }

    @Override
    public void sendDeletePostNotification(String adminId, String ownerOfPostId) {
        sendNotification(NotificationTemplate.DELETE_POST, adminId, null, List.of(ownerOfPostId), false, true);
    }
}
