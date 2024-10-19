package com.react_to_spring.React_To_Spring_Forums.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.react_to_spring.React_To_Spring_Forums.enums.ReactName;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@ToString
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReactResponse {
    String id;
    ReactName name;
    String userId;
    String postId;
    LocalDateTime createdDate;
}
