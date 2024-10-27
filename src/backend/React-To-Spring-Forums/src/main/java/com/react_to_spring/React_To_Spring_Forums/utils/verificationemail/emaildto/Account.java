package com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.emaildto;

import lombok.Builder;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Getter
public class Account {
    String name;
    String email;
}
