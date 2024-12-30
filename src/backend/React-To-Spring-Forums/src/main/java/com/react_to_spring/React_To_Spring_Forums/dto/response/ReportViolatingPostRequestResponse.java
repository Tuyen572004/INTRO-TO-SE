package com.react_to_spring.React_To_Spring_Forums.dto.response;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReportViolatingPostRequestResponse {
    String id;
    UserInfoResponse user;
    PostResponse post;
    String reason;
}
