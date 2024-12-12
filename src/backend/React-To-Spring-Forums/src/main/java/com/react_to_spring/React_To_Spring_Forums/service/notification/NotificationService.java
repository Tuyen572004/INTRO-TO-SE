package com.react_to_spring.React_To_Spring_Forums.service.notification;

import com.react_to_spring.React_To_Spring_Forums.dto.response.NotificationRecipientResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.NotificationResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Notification;
import com.react_to_spring.React_To_Spring_Forums.entity.NotificationRecipient;
import com.react_to_spring.React_To_Spring_Forums.enums.ReactName;

import java.util.List;

public interface NotificationService {
    //Notification createNotification(String actorId, String notificationType, String message);
    void sendNotification(Notification notification, List<String> recipientIds);
    PageResponse<NotificationResponse> findNotificationsByRecipientId(String userId, int page, int size);
    NotificationRecipientResponse markAsRead(String notificationId);

    void sendPostCreationNotification(String userId,String postId);
    void sendCommentCreationNotification(String userId,String postOwnerId,String commentId);
    void sendReactToPostCreationNotification(String userId,String postOwnerId, String reactId);
    void sendAddFriendNotification(String userId, String addFriendRequestId);
    void sendAcceptFriendNotification(String userId, String friendId);
    void sendMessageNotification(String userId, String messageId);

    void sendReportViolatingPostNotification(String userId, String reportId);  // Notes: send to all admins
    void sendAcceptReportViolatingPostNotification (String adminId,String reportId);
    void sendDeletePostNotification(String adminId, String ownerOfPostId,String postId);
}
