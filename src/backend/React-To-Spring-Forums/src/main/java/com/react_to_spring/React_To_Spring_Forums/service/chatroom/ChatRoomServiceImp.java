package com.react_to_spring.React_To_Spring_Forums.service.chatroom;

import com.react_to_spring.React_To_Spring_Forums.dto.request.chatroom.ChatRoomCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ChatRoomResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.ChatRoom;
import com.react_to_spring.React_To_Spring_Forums.mapper.ChatRoomMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.ChatRoomRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatRoomServiceImp implements ChatRoomService {

    ChatRoomRepository chatRoomRepository;

    ChatRoomMapper chatRoomMapper;

    @Override
    public ChatRoomResponse createChatRoom(ChatRoomCreationRequest request) {
        ChatRoom chatRoom = chatRoomRepository.findChatRoomByParticipantIds(request.getParticipantIds()).orElse(
                chatRoomMapper.toChatRoom(request)
        );
        chatRoom.setChatId(UUID.randomUUID().toString());
        chatRoomRepository.save(chatRoom);

        return chatRoomMapper.toChatRoomResponse(chatRoom);
    }

    @Override
    public ChatRoomResponse getDirectChatRoom(String senderId, String recipientId) {
        List<String> participantIds = List.of(senderId, recipientId);
        ChatRoom chatRoom = chatRoomRepository.findByParticipantIds(participantIds).orElse(null);

        if (chatRoom == null) {
            return createChatRoom(ChatRoomCreationRequest.builder()
                    .chatRoomName("")
                    .participantIds(participantIds)
                    .build());
        }

        return chatRoomMapper.toChatRoomResponse(chatRoom);
    }

    @Override
    public PageResponse<ChatRoomResponse> getMyChatRooms(int page, int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable pageable = PageRequest.of(page - 1, size);

        Page<ChatRoom> chatRooms = chatRoomRepository
                .findChatRoomByParticipantIdsContaining(List.of(authentication.getName()), pageable);

        List<ChatRoomResponse> chatRoomResponses = chatRooms.getContent().stream()
                .map(chatRoomMapper::toChatRoomResponse).toList();

        return PageResponse.<ChatRoomResponse>builder()
                .page(page)
                .size(size)
                .totalPages(chatRooms.getTotalPages())
                .totalElements(chatRooms.getTotalElements())
                .data(chatRoomResponses)
                .build();
    }

    @Override
    public void deleteChatRoom(String chatId) {
        chatRoomRepository.deleteByChatId(chatId);
    }
}
