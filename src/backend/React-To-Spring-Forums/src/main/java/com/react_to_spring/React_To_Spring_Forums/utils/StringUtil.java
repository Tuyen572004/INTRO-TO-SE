package com.react_to_spring.React_To_Spring_Forums.utils;

public class StringUtil {
    public static boolean isEmpty(String str) {
        if (str == null || str.trim().isEmpty()) {
            return true;
        }
        return false;
    }
}
