package com.react_to_spring.React_To_Spring_Forums.dto.request.message;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SaveMessageRequest {
    String chatId;
    String senderId;
    List<String> recipientIds;
    String content;
    List<String> images;
}
