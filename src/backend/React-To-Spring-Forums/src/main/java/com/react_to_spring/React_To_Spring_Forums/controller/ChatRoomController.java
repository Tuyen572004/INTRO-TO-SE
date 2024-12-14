package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.chatroom.ChatRoomCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ChatRoomResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.service.chatroom.ChatRoomService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat-rooms")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatRoomController {

    ChatRoomService chatRoomService;

    @PostMapping
    public ApiResponse<ChatRoomResponse> createChatRoom(@RequestBody ChatRoomCreationRequest request) {
        return ApiResponse.<ChatRoomResponse>builder()
                .data(chatRoomService.createChatRoom(request))
                .build();
    }

    @GetMapping
    public ApiResponse<ChatRoomResponse> getDirectChatRoom(@RequestParam("senderId") String senderId,
                                                           @RequestParam("recipientId") String recipientId) {
        return ApiResponse.<ChatRoomResponse>builder()
                .data(chatRoomService.getDirectChatRoom(senderId, recipientId))
                .build();
    }

    @GetMapping("/my-chat-rooms")
    public ApiResponse<PageResponse<ChatRoomResponse>> getMyChatRooms(@RequestParam("page") int page,
                                                                              @RequestParam("size") int size) {
        return ApiResponse.<PageResponse<ChatRoomResponse>>builder()
                .data(chatRoomService.getMyChatRooms(page, size))
                .build();
    }

}
