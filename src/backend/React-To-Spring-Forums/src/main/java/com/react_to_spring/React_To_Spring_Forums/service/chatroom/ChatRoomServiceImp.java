package com.react_to_spring.React_To_Spring_Forums.service.chatroom;

import com.react_to_spring.React_To_Spring_Forums.dto.request.chatroom.ChatRoomCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ChatRoomResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserProfileResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.ChatRoom;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.ChatRoomMapper;
import com.react_to_spring.React_To_Spring_Forums.mapper.UserProfilerMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.ChatRoomRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserProfileRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatRoomServiceImp implements ChatRoomService {

    ChatRoomRepository chatRoomRepository;
    UserProfileRepository UserProfileRepository;

    ChatRoomMapper chatRoomMapper;
    UserProfilerMapper userProfilerMapper;

    @Override
    public ChatRoomResponse createChatRoom(ChatRoomCreationRequest request) {
        ChatRoom chatRoom = chatRoomRepository.findChatRoomByParticipantIds(request.getParticipantIds()).orElse(
                chatRoomMapper.toChatRoom(request)
        );

        chatRoom.setChatId(UUID.randomUUID().toString());
        if (request.getChatRoomName() == null || request.getChatRoomName().isEmpty()) {
            chatRoom.setChatRoomName("");
        }
        chatRoomRepository.save(chatRoom);
        log.info(chatRoom.toString());
        return buildChatRoomResponse(chatRoom);
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

        return buildChatRoomResponse(chatRoom);
    }

    @Override
    public PageResponse<ChatRoomResponse> getMyChatRooms(int page, int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable pageable = PageRequest.of(page - 1, size);

        Page<ChatRoom> chatRooms = chatRoomRepository
                .findChatRoomByParticipantIdsContaining(List.of(authentication.getName()), pageable);

        List<ChatRoomResponse> chatRoomResponses = chatRooms.getContent().stream()
                .map(this::buildChatRoomResponse).toList();



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

    private String buildChatRoomName(List<UserProfileResponse> participantProfiles) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        StringBuilder chatRoomName = new StringBuilder();
        for (UserProfileResponse userProfile : participantProfiles) {
            if(userProfile.getUserId().equals(authentication.getName())) {
                continue;
            }
            chatRoomName.append(userProfile.getFirstName()).append(" ").append(userProfile.getLastName()).append(", ");
        }
        return chatRoomName.substring(0, chatRoomName.length() - 2);
    }

    private ChatRoomResponse buildChatRoomResponse(ChatRoom chatRoom) {
        ChatRoomResponse chatRoomResponse = chatRoomMapper.toChatRoomResponse(chatRoom);
        List<UserProfileResponse> participantProfiles = new ArrayList<>();
        for (String participantId : chatRoom.getParticipantIds()) {
            UserProfile userProfile = UserProfileRepository.findByUserId(participantId).orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND));
            participantProfiles.add(userProfilerMapper.toUserProfileResponse(userProfile));
        }
        chatRoomResponse.setParticipantProfiles(participantProfiles);

        if ( chatRoom.getChatRoomName() == null || chatRoom.getChatRoomName().isEmpty()) {
            chatRoomResponse.setChatRoomName(buildChatRoomName(participantProfiles));
        }
        return chatRoomResponse;
    }
}
