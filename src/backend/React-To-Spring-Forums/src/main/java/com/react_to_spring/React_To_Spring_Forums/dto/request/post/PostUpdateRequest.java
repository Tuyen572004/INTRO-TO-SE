package com.react_to_spring.React_To_Spring_Forums.dto.request.post;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.Date;


@Setter
@Getter
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class PostUpdateRequest {
    @JsonProperty("_id")
    @NotNull(message = "REQUIRED_POST_ID")
    String id;

    @JsonProperty("title")
    String title;

    @JsonProperty("content")
    String content;

    @JsonProperty("image_url")
    String imageURL;
}
