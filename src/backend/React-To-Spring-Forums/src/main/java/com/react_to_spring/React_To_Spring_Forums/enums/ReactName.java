package com.react_to_spring.React_To_Spring_Forums.enums;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
<<<<<<<< HEAD:src/backend/React-To-Spring-Forums/src/main/java/com/react_to_spring/React_To_Spring_Forums/enums/Role.java
public enum Role {
    USER("USER"),
    ADMIN("ADMIN"),
;
========
public enum ReactName {
    LIKE("LIKE"),
    DISLIKE("DISLIKE"),
    LOVE("LOVE"),
    HAHA("HAHA"),
    WOW("WOW"),
    SAD("SAD"),
    ANGRY("ANGRY"),
    ;
>>>>>>>> main:src/backend/React-To-Spring-Forums/src/main/java/com/react_to_spring/React_To_Spring_Forums/enums/ReactName.java

    String name;

    ReactName(String name) {
        this.name = name;
    }

}
