package com.react_to_spring.React_To_Spring_Forums.mapper;

import com.react_to_spring.React_To_Spring_Forums.dto.request.message.SaveMessageRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.MessageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface MessageMapper {

    Message toMessage(SaveMessageRequest request);

    MessageResponse toMessageResponse(Message message);

}
