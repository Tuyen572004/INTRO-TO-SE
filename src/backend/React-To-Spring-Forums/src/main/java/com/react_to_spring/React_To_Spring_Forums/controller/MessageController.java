package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.message.SaveMessageRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.MessageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.service.message.MessageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MessageController {

    MessageService messageService;

    @MessageMapping("/chat")
    public ApiResponse<MessageResponse> saveMessage(@RequestBody SaveMessageRequest request) {
        return ApiResponse.<MessageResponse>builder()
                .data(messageService.saveMessage(request))
                .build();
    }

    @GetMapping
    public ApiResponse<PageResponse<MessageResponse>> getMessages(String chatId, int page, int size) {
        return ApiResponse.<PageResponse<MessageResponse>>builder()
                .data(messageService.getMessages(chatId, page, size))
                .build();
    }
}
