package com.react_to_spring.React_To_Spring_Forums.exception;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum ErrorCode {
//    Internal Server Error Undefined	9999
    UNCATEGORIZED_EXCEPTION(9999, HttpStatus.INTERNAL_SERVER_ERROR, "Uncategorized Error"),
//    Internal Server Error	Developer	1xxx
    INVALID_KEY(1001, HttpStatus.INTERNAL_SERVER_ERROR, "Invalid Key"),
//    Bad Request	Client	2xxx
//    Unauthorized	Client	3xxx (Unauthenticated error)
//    Forbidden	Client	4xxx (Unauthorized error)
    UNAUTHORIZED(3001, HttpStatus.FORBIDDEN, "Don't have permission"),
//    Not Found	Client	5xxx
    ;
    final Integer code;
    final HttpStatus status;
    final String message;
}
