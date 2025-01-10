package com.react_to_spring.React_To_Spring_Forums.exception;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotVerifiedException extends AppException{
    String email;

    public NotVerifiedException(String email) {
        super(ErrorCode.NOT_VERIFIED);
        this.email = email;
    }
}
