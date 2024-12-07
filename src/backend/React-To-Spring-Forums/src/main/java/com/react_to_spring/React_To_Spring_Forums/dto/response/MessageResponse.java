package com.react_to_spring.React_To_Spring_Forums.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MessageResponse {
    String chatId;
    String senderId;
    List<String> recipientIds;
    String content;
    List<String> images;
    String formattedSentTime;
}
