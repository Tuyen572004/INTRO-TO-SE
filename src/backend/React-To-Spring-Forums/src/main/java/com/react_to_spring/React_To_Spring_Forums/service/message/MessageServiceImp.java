package com.react_to_spring.React_To_Spring_Forums.service.message;

import com.react_to_spring.React_To_Spring_Forums.dto.request.chatroom.ChatRoomCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.message.SaveMessageRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.MessageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Message;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.MessageMapper;
import com.react_to_spring.React_To_Spring_Forums.mapper.UserProfilerMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.MessageRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserProfileRepository;
import com.react_to_spring.React_To_Spring_Forums.service.chatroom.ChatRoomService;
import com.react_to_spring.React_To_Spring_Forums.service.notification.NotificationService;
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
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MessageServiceImp implements MessageService {

    @NonFinal
    String DEFAULT_SORT_FIELD = "sentAt";

    MessageRepository messageRepository;

    UserProfileRepository userProfileRepository;

    ChatRoomService chatRoomService;

    MessageMapper messageMapper;

    SimpMessagingTemplate simpMessagingTemplate;

    NotificationService notificationService;

    UserProfilerMapper userProfilerMapper;

    @Override
    public MessageResponse saveMessage(SaveMessageRequest request) {
        String chatId = request.getChatId();
        if (request.getChatId() == null) {
            List<String> participantIds = new ArrayList<>();
            participantIds.add(request.getSenderId());
            participantIds.addAll(request.getRecipientIds());
            chatId = chatRoomService.createChatRoom(ChatRoomCreationRequest.builder()
                            .participantIds(participantIds)
                            .build()).getChatId();
        }

        Message message = messageMapper.toMessage(request);
        message.setChatId(chatId);
        message.setSentAt(LocalDateTime.now());
        message.setReadStatus(false);

        String destination = "/queue/messages" + chatId;
        simpMessagingTemplate.convertAndSendToUser(request.getSenderId(), destination, messageMapper.toMessageResponse(message));
        for (String recipientId : request.getRecipientIds()) {
            simpMessagingTemplate.convertAndSendToUser(recipientId, destination, messageMapper.toMessageResponse(message));
            notificationService.sendMessageNotification(request.getSenderId(),recipientId, message.getId());
        }
        return messageMapper.toMessageResponse(messageRepository.save(message));
    }

    @Override
    public PageResponse<MessageResponse> getMessages(String chatId, int page, int size) {
        Sort sort = Sort.by(Sort.Order.asc(DEFAULT_SORT_FIELD));
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<Message> messages = messageRepository.findByChatId(chatId, pageable);

        List<MessageResponse> messageResponses = messages.getContent().stream()
                .map(this::buildMessageResponse).toList();

        return PageResponse.<MessageResponse>builder()
                .page(page)
                .size(size)
                .totalElements(messages.getTotalElements())
                .totalPages(messages.getTotalPages())
                .data(messageResponses)
                .build();
    }

    private MessageResponse buildMessageResponse(Message message) {
        UserProfile sender = userProfileRepository.findByUserId(message.getSenderId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND));
        List<UserProfile> recipients = userProfileRepository.findAllByUserIdIn(message.getRecipientIds());

        MessageResponse messageResponse = messageMapper.toMessageResponse(message);
        messageResponse.setFormattedSentTime(Date.from(message.getSentAt().toInstant(ZoneOffset.UTC)));
        messageResponse.setSenderProfile(userProfilerMapper.toUserProfileResponse(sender));
        messageResponse.setRecipientProfiles(recipients.stream().map(userProfilerMapper::toUserProfileResponse).toList());

        return messageResponse;
    }
}
