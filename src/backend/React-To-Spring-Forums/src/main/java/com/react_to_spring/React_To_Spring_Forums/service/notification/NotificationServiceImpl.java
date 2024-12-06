package com.react_to_spring.React_To_Spring_Forums.service.notification;

import com.react_to_spring.React_To_Spring_Forums.dto.response.NotificationResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Notification;
import com.react_to_spring.React_To_Spring_Forums.entity.NotificationRecipient;
import com.react_to_spring.React_To_Spring_Forums.entity.User;
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
import java.util.List;
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

        // Send WebSocket notifications in parallel
        List<CompletableFuture<Void>> futures = recipientIds.stream()
                .map(recipientId -> CompletableFuture.runAsync(() ->
                        simpMessagingTemplate.convertAndSendToUser(recipientId, "/queue/notifications", notification)))
                .collect(Collectors.toList());

        // Wait for all notifications to be sent
        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
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
                        notificationResponse.setFormattedCreatedDate(dateFormatter.format(notification.getSendAt()));
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

    @Override
    public void sendPostCreationNotification(String userId,String entityId, String title) {
        String userName = userRepository.findById(userId).get().getUsername();
        String message = NotificationTemplate.CREATE_POST.formatMessage(userName,title);
        Notification notification = Notification.builder()
                .actorId(userId)
                .notificationType(NotificationTemplate.CREATE_POST.getEntity())
                .notificationEntityId(entityId)
                .message(message)
                .sendAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);

        List<String> recipientIds = userProfileRepository.findByUserId(userId).get().getFriendIds();

        recipientIds.addAll(userRepository.findByRole("ADMIN").stream().map(User::getId).toList());

        sendNotification(notification, recipientIds);

    }

    @Override
    public void sendCommentCreationNotification(String userId,String entityId) {
        String userName = userRepository.findById(userId).get().getUsername();
        String message = NotificationTemplate.CREATE_COMMENT.formatMessage(userName);
        Notification notification = Notification.builder()
                .actorId(userId)
                .notificationType(NotificationTemplate.CREATE_COMMENT.getEntity())
                .notificationEntityId(entityId)
                .message(message)
                .sendAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);

        List<String> recipientIds = userProfileRepository.findByUserId(userId).get().getFriendIds();

        recipientIds.addAll(userRepository.findByRole("ADMIN").stream().map(User::getId).toList());

        sendNotification(notification, recipientIds);

    }

    @Override
    public void sendReactToPostCreationNotification(String userId,String entityId, String name) {
        String userName = userRepository.findById(userId).get().getUsername();
        String message = NotificationTemplate.CREATE_REACT_TO_POST.formatMessage(userName,name);
        Notification notification = Notification.builder()
                .actorId(userId)
                .notificationType(NotificationTemplate.CREATE_REACT_TO_POST.getEntity())
                .notificationEntityId(entityId)
                .message(message)
                .sendAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
    }
}
