package com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.generator;

import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.entity.VerifyCode;

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
        String verificationCode = UUID.randomUUID().toString();

        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(expirationDuration);

        // Create and return a new VerifyCode object
        return VerifyCode.builder()
                .verifyCode(verificationCode)
                .expirationTime(expirationTime)
                .user(user)
                .build();
    }
}
