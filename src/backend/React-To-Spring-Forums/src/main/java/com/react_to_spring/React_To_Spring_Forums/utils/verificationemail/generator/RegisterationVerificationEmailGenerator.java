package com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.generator;

import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.entity.VerifyCode;

import com.react_to_spring.React_To_Spring_Forums.enums.VerifyCodeType;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;


@Component
@RequiredArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE, makeFinal = true)
@Qualifier("RegistrationGenerator")
public class RegisterationVerificationEmailGenerator implements VerificationEmailGenerator {

    @NonFinal
    @Value("${app.email.verification.expiration}")
    int expirationDuration;

    @Override
    public VerifyCode generateVerifyCode(User user) {
        StringBuilder verificationCode = new StringBuilder(VerifyCodeType.AUTHORIZE.getType());
        verificationCode.append("-");
        verificationCode.append(UUID.randomUUID().toString());

        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(expirationDuration);

        // Create and return a new VerifyCode object
        return VerifyCode.builder()
                .verifyCode(verificationCode.toString())
                .expirationTime(expirationTime)
                .user(user)
                .build();
    }
}
