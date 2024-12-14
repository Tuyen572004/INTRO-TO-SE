package com.react_to_spring.React_To_Spring_Forums.service.verifycode;

import com.react_to_spring.React_To_Spring_Forums.dto.request.verifycode.SendVerificationRequest;
import com.react_to_spring.React_To_Spring_Forums.entity.User;

public interface VerifyCodeService {
    boolean verify(String userId, String verificationCode);

    void sendVerifyCode (SendVerificationRequest sendVerificationRequest);

    void sendVerifyLink(SendVerificationRequest sendVerificationRequest);

    String buildRedirectUrl(boolean success);

    void deleteVerifyCode(String userId, String verificationCode);
}
