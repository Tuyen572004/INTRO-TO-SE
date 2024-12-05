package com.react_to_spring.React_To_Spring_Forums.dto.request.chatroom;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatRoomCreationRequest {

    String chatRoomName;

    List<String> participantIds;
}
