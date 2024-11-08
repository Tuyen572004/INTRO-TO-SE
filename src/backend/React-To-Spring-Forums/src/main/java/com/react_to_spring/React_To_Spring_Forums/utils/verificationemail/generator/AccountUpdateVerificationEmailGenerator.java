package com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.generator;

import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.entity.VerifyCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Component
@RequiredArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE, makeFinal = true)
@Qualifier("AccountUpdateGenerator")
public class AccountUpdateVerificationEmailGenerator implements VerificationEmailGenerator{
    @NonFinal
    @Value("${app.email.verification.expiration}")
    int expirationDuration;

    @NonFinal
    @Value("${app.email.verification.reset-password.length}")
    int resetPasswordLength;


    @Override
    public VerifyCode generateVerifyCode(User user) {
        // Generate a random verification code of length resetPasswordLength
        String verificationCode = new Random().ints(48, 58) // ASCII range for digits 0-9
                .limit(resetPasswordLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(expirationDuration);

        return VerifyCode.builder()
                .verifyCode(verificationCode)
                .expirationTime(expirationTime)
                .user(user)
                .build();
    }
}
