package com.react_to_spring.React_To_Spring_Forums.service.notification;

import com.react_to_spring.React_To_Spring_Forums.dto.response.NotificationResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Notification;
import com.react_to_spring.React_To_Spring_Forums.entity.NotificationRecipient;
import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.enums.NotificationTemplate;
import com.react_to_spring.React_To_Spring_Forums.enums.ReactName;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.NotificationMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.NotificationRecipientRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.NotificationRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserProfileRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
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
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import static org.apache.commons.lang3.BooleanUtils.forEach;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    @NonFinal
    String defaultSortField = "sentAt";

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
                        .build())
                .collect(Collectors.toList());
        notificationRecipientRepository.saveAll(recipients);

        for(String recipientId : recipientIds){
            NotificationResponse notificationResponse = notificationMapper.toNotificationResponse(notification);
            notificationResponse.setFormattedSentTime(dateFormatter.format(notification.getSendAt()));
            simpMessagingTemplate.convertAndSendToUser(recipientId, "/queue/notifications", notificationResponse);
        }

    }

    @Override
    public PageResponse<NotificationResponse> findNotificationsByRecipientId(String userId, int page, int size) {
        Sort sort = Sort.by(Sort.Order.desc(defaultSortField));
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<NotificationRecipient> notificationRecipients = notificationRecipientRepository.findAllByRecipientId(userId, pageable);
        List<NotificationResponse> notificationResponses = notificationRecipients.getContent().stream()
                .map( notificationRecipient  -> {
                        Notification notification = notificationRepository.findById(notificationRecipient.getNotificationId())
                        .orElseThrow(() -> new AppException(ErrorCode.NOTIFICATION_NOT_FOUND));
                        NotificationResponse notificationResponse = notificationMapper.toNotificationResponse(notification);
                        notificationResponse.setFormattedSentTime(dateFormatter.format(notification.getSendAt()));
                        return notificationResponse;
            }).toList();

        return PageResponse.<NotificationResponse>builder()
                .page(page)
                .size(size)
                .totalElements(notificationRecipients.getTotalElements())
                .totalPages(notificationRecipients.getTotalPages())
                .data(notificationResponses)
                .build();
    }

    @Override
    public void markAsRead(String notificationId, String userId) {
        NotificationRecipient notificationRecipient = notificationRecipientRepository.findByNotificationIdAndRecipientId(notificationId, userId);
        if(notificationRecipient==null){
            throw new AppException(ErrorCode.NOTIFICATION_NOT_FOUND);
        }
        notificationRecipient.setReadStatus(true);
    }


    private void sendNotification(NotificationTemplate template, String userId, String notificationEntityId) {
        // Fetch user details
        String userName = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getUsername();

        // Format message using the template
        String message = template.formatMessage(userName);

        // Build notification object
        Notification notification = Notification.builder()
                .actorId(userId)
                .notificationType(template.getEntity())
                .notificationEntityId(notificationEntityId)
                .message(message)
                .sendAt(LocalDateTime.now())
                .build();

        // Save notification
        notificationRepository.save(notification);

        List<String> recipientIds = new ArrayList<String>();
        List<String> friendIds = userProfileRepository.findByUserId(userId).get().getFriendIds();
        if(friendIds!=null){
            recipientIds.addAll(friendIds);
        }

        if(template==NotificationTemplate.CREATE_POST){
            // inform admin
            recipientIds.addAll(userRepository.findByRole_Name("ADMIN").stream().map(User::getId).toList());
        }

        sendNotification(notification, recipientIds);
    }

    // Template-specific methods delegate to the generic method
    @Override
    public void sendPostCreationNotification(String userId, String postId) {
        sendNotification(NotificationTemplate.CREATE_POST, userId, postId);
    }

    @Override
    public void sendCommentCreationNotification(String userId, String commentId) {
        sendNotification(NotificationTemplate.CREATE_COMMENT, userId, commentId);
    }

    @Override
    public void sendReactToPostCreationNotification(String userId, String reactId) {
        sendNotification(NotificationTemplate.CREATE_REACT_TO_POST, userId, reactId);
    }

    @Override
    public void sendAddFriendNotification(String userId, String addFriendRequestId) {
        sendNotification(NotificationTemplate.SEND_ADD_FRIEND_REQUEST, userId, addFriendRequestId);
    }

    @Override
    public void sendAcceptFriendNotification(String userId, String acceptFriendRequestId) {
        sendNotification(NotificationTemplate.ACCEPT_FRIEND_REQUEST, userId, acceptFriendRequestId);
    }

    @Override
    public void sendMessageNotification(String userId, String messageId) {
        sendNotification(NotificationTemplate.CREATE_MESSAGE, userId, messageId);
    }

}
