package com.react_to_spring.React_To_Spring_Forums.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApiResponse <T> {
    @Builder.Default
    Integer code = 1000;
    String message;
    T data;
}
