package com.react_to_spring.React_To_Spring_Forums.dto.request.react;

import com.react_to_spring.React_To_Spring_Forums.enums.ReactName;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReactCreationRequest {
    @NotNull(message = "REQUIRED_REACT_NAME")
    ReactName name;

    @NotNull(message = "REQUIRED_USER_ID")
    String userId;

    @NotNull(message = "REQUIRED_POST_ID")
    String postId;
}
