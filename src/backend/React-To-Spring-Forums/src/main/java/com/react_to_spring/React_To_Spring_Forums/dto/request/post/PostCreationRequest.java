package com.react_to_spring.React_To_Spring_Forums.dto.request.post;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Setter
@Getter
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class PostCreationRequest {
    @JsonProperty("title")
    String title;

    @JsonProperty("content")
    String content;

    @JsonProperty("image_url")
    List<String> imageUrls;
}
