package com.react_to_spring.React_To_Spring_Forums.service.notification;

import com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost.ResponseReportViolatingPostRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.NotificationRecipientResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.NotificationResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.*;
import com.react_to_spring.React_To_Spring_Forums.enums.NotificationTemplate;
import com.react_to_spring.React_To_Spring_Forums.enums.ReactName;
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
    private final ReportViolatingPostRequestRepository reportViolatingPostRequestRepository;
    private final AddFriendRequestRepository addFriendRequestRepository;
    private final NotificationRecipientMapper notificationRecipientMapper;
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
    public NotificationRecipientResponse markAsRead(String notificationId) {
        NotificationRecipient notificationRecipient = notificationRecipientRepository.findById(notificationId)
                .orElseThrow(() -> new AppException(ErrorCode.NOTIFICATION_RECIPIENT_NOT_FOUND));
        notificationRecipient.setReadStatus(true);
        notificationRecipientRepository.save(notificationRecipient);
        return notificationRecipientMapper.toNotificationRecipientResponse(notificationRecipient);
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

        List<String> recipientIds = new ArrayList<String>();

        // Save notification
        notificationRepository.save(notification);

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

    // for reporting a post
    private void sendToAdminOnlyNotification(NotificationTemplate notificationTemplate,String userId, String notificationEntityId){
        // Fetch user details
        String userName = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getUsername();

        // Format message using the template
        String message = notificationTemplate.formatMessage(userName);

        // Build notification object
        Notification notification = Notification.builder()
                .actorId(userId)
                .notificationType(notificationTemplate.getEntity())
                .notificationEntityId(notificationEntityId)
                .message(message)
                .sendAt(LocalDateTime.now())
                .build();

        List<String> recipientIds = userRepository.findByRole_Name("ADMIN").stream().map(User::getId).toList();
        sendNotification(notification, recipientIds);
    }

    // For deleting a post, accept report
    private void sendToSpecificUserNotification(NotificationTemplate notificationTemplate,String userId, String recipient, String notificationEntity){
        String userName = ""; // Notification from admin is anonymous (Sender's name is "")
        String message = notificationTemplate.formatMessage(userName);
        Notification notification = Notification.builder()
                .actorId(userId)
                .notificationType(notificationTemplate.getEntity())
                .notificationEntityId(notificationEntity)
                .message(message)
                .sendAt(LocalDateTime.now())
                .build();

        List<String> recipientIds = new ArrayList<String>();
        recipientIds.add(recipient);
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

        AddFriendRequest addFriendRequest = addFriendRequestRepository.findById(addFriendRequestId)
                .orElseThrow(() -> new AppException(ErrorCode.ADD_FRIEND_REQUEST_NOT_FOUND));
        User friend = userRepository.findById(addFriendRequest.getReceivingUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        sendToSpecificUserNotification(NotificationTemplate.SEND_ADD_FRIEND_REQUEST, userId, friend.getId(), addFriendRequestId);
    }

    @Override
    public void sendAcceptFriendNotification(String userId, String friendId) {
        sendToSpecificUserNotification(NotificationTemplate.ACCEPT_FRIEND_REQUEST, userId, friendId, userId);
    }

    @Override
    public void sendMessageNotification(String userId, String messageId) {
        sendNotification(NotificationTemplate.CREATE_MESSAGE, userId, messageId);
    }

    @Override
    public void sendReportViolatingPostNotification(String userId, String reportId) {
        // reason why sending entire report object instead of post reported like other methods
        // we have more things to send : reason, post reported
        sendToAdminOnlyNotification(NotificationTemplate.SEND_REPORT_REQUEST,userId,reportId);
    }

    @Override
    public void sendAcceptReportViolatingPostNotification(String adminId, String reportId) {
        ReportViolatingPostRequest report = reportViolatingPostRequestRepository.findById(reportId)
                .orElseThrow(() -> new AppException(ErrorCode.REPORT_VIOLATING_POST_NOT_FOUND));
        String reporterId = report.getSendingUserId();
        sendToSpecificUserNotification(NotificationTemplate.ACCEPT_REPORT_REQUEST, adminId, reporterId, reportId);
    }

    @Override
    public void sendDeletePostNotification(String adminId, String ownerOfPostId, String postId) {
        sendToSpecificUserNotification(NotificationTemplate.DELETE_POST, adminId, ownerOfPostId, postId);
    }


}
