package com.react_to_spring.React_To_Spring_Forums.enums;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ReactName {
    LIKE("LIKE"),
    DISLIKE("DISLIKE"),
    LOVE("LOVE"),
    HAHA("HAHA"),
    WOW("WOW"),
    SAD("SAD"),
    ANGRY("ANGRY"),
    ;
    String name;

    ReactName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}
