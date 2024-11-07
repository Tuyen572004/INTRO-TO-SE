package com.react_to_spring.React_To_Spring_Forums.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {
    String id;
    String userId;
    String author;
    String authorAvatar;
    String title;
    String content;
    List<String> imageUrls;
    LocalDateTime createdDate;
    Map<String, Integer> reacts;
    Integer commentCounts;
}
