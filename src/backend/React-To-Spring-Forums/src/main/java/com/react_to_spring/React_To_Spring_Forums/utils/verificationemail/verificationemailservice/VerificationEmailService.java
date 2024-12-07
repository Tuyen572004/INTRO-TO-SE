package com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.verificationemailservice;

import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.entity.VerifyCode;

public interface VerificationEmailService {
    VerifyCode sendRegistration(User user);

    VerifyCode sendCode(User user);
}
