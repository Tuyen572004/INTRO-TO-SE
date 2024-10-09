package com.react_to_spring.React_To_Spring_Forums.enums;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum Role {
    USER("USER"),
    ADMIN("ADMIN"),
    ;

    String name;

    Role(String name) {
        this.name = name;
    }

}
