package com.react_to_spring.React_To_Spring_Forums.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum VerifyCodeType {
    AUTHORIZE ("AU");

    private final String type;
}
