package com.react_to_spring.React_To_Spring_Forums.utils.verificationemail;

import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.entity.VerifyCode;

public interface VerificationEmailGenerator {
    default VerifyCode generateVerifyCode(User user) {
        return new VerifyCode();
    }
}
