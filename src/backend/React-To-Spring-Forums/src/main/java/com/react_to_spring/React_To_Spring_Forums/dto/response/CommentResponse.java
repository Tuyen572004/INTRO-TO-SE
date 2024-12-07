package com.react_to_spring.React_To_Spring_Forums.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentResponse {
    String id;
    UserInfoResponse user;
    String content;
    List<String> imageList;
    LocalDateTime createdDate;
}
