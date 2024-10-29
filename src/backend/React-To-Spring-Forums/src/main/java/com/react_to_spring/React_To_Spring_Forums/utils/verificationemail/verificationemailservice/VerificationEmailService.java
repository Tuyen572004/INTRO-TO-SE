package com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.verificationemailservice;

import com.react_to_spring.React_To_Spring_Forums.entity.User;

public interface VerificationEmailService {
    void sendRegistration(User user);

    void sendCode(User user);
}
