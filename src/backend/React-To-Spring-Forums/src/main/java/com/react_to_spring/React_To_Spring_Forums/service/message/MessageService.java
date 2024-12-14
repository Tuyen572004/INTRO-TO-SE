package com.react_to_spring.React_To_Spring_Forums.service.message;

import com.react_to_spring.React_To_Spring_Forums.dto.request.message.SaveMessageRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.MessageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;

public interface MessageService {
    MessageResponse saveMessage(SaveMessageRequest request);

    PageResponse<MessageResponse> getMessages(String chatId, int page, int size);
}
