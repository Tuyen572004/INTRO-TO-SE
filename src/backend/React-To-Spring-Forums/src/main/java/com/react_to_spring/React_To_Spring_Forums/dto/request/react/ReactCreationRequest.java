package com.react_to_spring.React_To_Spring_Forums.dto.request.react;

import com.react_to_spring.React_To_Spring_Forums.enums.ReactName;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReactCreationRequest {
    @NotNull(message = "Name is required")
    ReactName name;

    @NotNull(message = "User ID is required")
    String userId;

    @NotNull(message = "Post ID is required")
    String postId;

    LocalDateTime createdDate;
}
