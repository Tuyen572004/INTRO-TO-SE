package com.react_to_spring.React_To_Spring_Forums.mapper;

import com.react_to_spring.React_To_Spring_Forums.dto.response.NotificationRecipientResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.NotificationRecipient;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE)
public interface NotificationRecipientMapper {
    NotificationRecipientResponse toNotificationRecipientResponse(NotificationRecipient notificationRecipient);
}
