package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.NotificationRecipientResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.NotificationResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Notification;
import com.react_to_spring.React_To_Spring_Forums.service.notification.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationController {
    NotificationService notificationService;

    @NonFinal
    @Value("${app.controller.notification.response.mark-as-read-success}")
    String MARK_AS_READ_SUCCESS;

    @GetMapping
    @Operation(summary = "Get notifications for a user",
            description = "Get all notifications for a user by userId")
    public ApiResponse<PageResponse<NotificationResponse>> getNotifications(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                                                            @RequestParam(value = "size", required = false, defaultValue = "5") int size){
        return ApiResponse.<PageResponse<NotificationResponse>>builder()
                .data(notificationService.findNotifications(page, size))
                .build();
    }


    @PatchMapping("/{notificationId}")
    @Operation(summary = "Mark notification as read",
            description = "Mark notification as read by notificationId")
    public ApiResponse<NotificationRecipientResponse> markNotificationAsRead(@PathVariable String notificationId) {
        return ApiResponse.<NotificationRecipientResponse>builder()
                .data(notificationService.markAsRead(notificationId))
                .message(MARK_AS_READ_SUCCESS)
                .build();

    }
}
