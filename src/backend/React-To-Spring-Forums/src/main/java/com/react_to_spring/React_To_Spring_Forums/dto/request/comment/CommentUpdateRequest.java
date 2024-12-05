package com.react_to_spring.React_To_Spring_Forums.dto.request.comment;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Setter
@Getter
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CommentUpdateRequest {
    @JsonProperty("_id")
    @NotNull(message = "REQUIRED_COMMENT_ID")
    String id;

    @JsonProperty("content")
    String content;

    @JsonProperty("image_url")
    List<String> imageList;
}
