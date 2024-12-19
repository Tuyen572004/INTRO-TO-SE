package com.react_to_spring.React_To_Spring_Forums.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatRoomResponse {
    String chatId;
    String chatRoomName;
    String chatRoomUrl;
    List<UserProfileResponse> participantProfiles;
}
