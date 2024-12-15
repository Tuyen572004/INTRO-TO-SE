package com.react_to_spring.React_To_Spring_Forums.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@ToString
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SearchUserResponse {
    UserResponse user;
    UserProfileResponse userProfile;
}
