package com.react_to_spring.React_To_Spring_Forums.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddFriendRequestResponse {
    String sendingUserName;
    String sendingUserId;
    String receivingUserId;
}
