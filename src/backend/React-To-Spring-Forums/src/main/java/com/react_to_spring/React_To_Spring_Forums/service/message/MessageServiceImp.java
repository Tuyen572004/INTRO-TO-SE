package com.react_to_spring.React_To_Spring_Forums.service.message;

import com.react_to_spring.React_To_Spring_Forums.dto.request.chatroom.ChatRoomCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.message.SaveMessageRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.MessageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Message;
import com.react_to_spring.React_To_Spring_Forums.mapper.MessageMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.MessageRepository;
import com.react_to_spring.React_To_Spring_Forums.service.chatroom.ChatRoomService;
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

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MessageServiceImp implements MessageService {

    @NonFinal
    String defaultSortField = "sentAt";

    MessageRepository messageRepository;

    ChatRoomService chatRoomService;

    MessageMapper messageMapper;

    DateFormatter dateFormatter;

    SimpMessagingTemplate simpMessagingTemplate;

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

        simpMessagingTemplate.convertAndSendToUser(request.getSenderId(), "/queue/messages", messageMapper.toMessageResponse(message));
        for (String recipientId : request.getRecipientIds()) {
            simpMessagingTemplate.convertAndSendToUser(recipientId, "/queue/messages", messageMapper.toMessageResponse(message));
        }

        return messageMapper.toMessageResponse(messageRepository.save(message));
    }

    @Override
    public PageResponse<MessageResponse> getMessages(String chatId, int page, int size) {
        Sort sort = Sort.by(Sort.Order.asc(defaultSortField));
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<Message> messages = messageRepository.findByChatId(chatId, pageable);

        List<MessageResponse> messageResponses = messages.getContent().stream()
                .map(message -> {
                    MessageResponse messageResponse = messageMapper.toMessageResponse(message);
                    messageResponse.setFormattedSentTime(dateFormatter.format(message.getSentAt()));
                    return messageResponse;
                }).toList();

        return PageResponse.<MessageResponse>builder()
                .page(page)
                .size(size)
                .totalElements(messages.getTotalElements())
                .totalPages(messages.getTotalPages())
                .data(messageResponses)
                .build();
    }

}
