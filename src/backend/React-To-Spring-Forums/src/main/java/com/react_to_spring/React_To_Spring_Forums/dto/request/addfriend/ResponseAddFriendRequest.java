package com.react_to_spring.React_To_Spring_Forums.dto.request.addfriend;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResponseAddFriendRequest {
    String friendId;

    @JsonProperty("isAccepted")
    boolean isAccepted;
}