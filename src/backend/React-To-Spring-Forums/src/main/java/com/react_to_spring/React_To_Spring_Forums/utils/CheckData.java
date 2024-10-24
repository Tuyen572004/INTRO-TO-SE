package com.react_to_spring.React_To_Spring_Forums.utils;

import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;

public class CheckData {
    public static void checkContentEmpty(String content) {
        if (content == null || content.trim().isEmpty()) {
            throw new AppException(ErrorCode.CONTENT_IS_EMPTY);
        }
    }

    public static void checkTitleEmpty(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new AppException(ErrorCode.TITLE_IS_EMPTY);
        }
    }
}
