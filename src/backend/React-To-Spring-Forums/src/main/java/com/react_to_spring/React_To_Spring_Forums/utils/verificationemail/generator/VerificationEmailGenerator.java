package com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.generator;

import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.entity.VerifyCode;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;



public interface VerificationEmailGenerator {
    default VerifyCode generateVerifyCode(User user) {
        return new VerifyCode();
    }
}
