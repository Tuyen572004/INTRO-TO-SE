package com.react_to_spring.React_To_Spring_Forums.service.verifycode;

import com.react_to_spring.React_To_Spring_Forums.entity.User;

public interface VerifyCodeService {
    boolean verifyCode(String userId, String verificationCode);

    boolean verifyLink(String userId, String verificationCode);

    void sendVerifyCode ();

    void sendVerifyLink(User user);

}
