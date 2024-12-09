package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.NotificationResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Notification;
import com.react_to_spring.React_To_Spring_Forums.service.notification.NotificationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationController {
    NotificationService notificationService;

    @GetMapping
    public ApiResponse<PageResponse<NotificationResponse>> getNotifications(String userId, int page, int size) {
        return ApiResponse.<PageResponse<NotificationResponse>>builder()
                .data(notificationService.findNotificationsByRecipientId(userId, page, size))
                .build();
    }


}
