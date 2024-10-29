package com.react_to_spring.React_To_Spring_Forums.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse <T> {
    @Builder.Default
    Integer code = 1000;
    String message;
    T data;
}
