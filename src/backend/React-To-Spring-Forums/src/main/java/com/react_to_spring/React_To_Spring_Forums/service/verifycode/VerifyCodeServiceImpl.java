package com.react_to_spring.React_To_Spring_Forums.service.verifycode;

import com.react_to_spring.React_To_Spring_Forums.dto.request.verifycode.SendVerificationRequest;
import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.entity.VerifyCode;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.VerifyCodeRepository;
import com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.verificationemailservice.VerificationEmailService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class VerifyCodeServiceImpl implements VerifyCodeService {

    VerifyCodeRepository verifyCodeRepository;

    VerificationEmailService verificationEmailService;

    UserRepository userRepository;

    @NonFinal
    @Value("${client.verification-success-page}")
    String SUCCESS_REDIRECT_URL;

    @NonFinal
    @Value("${client.verification-fail-page}")
    String FAIL_REDIRECT_URL;

    @NonFinal
    @Value("${app.time.EXPIRATION_TIME_KEY}")
    String EXPIRATION_TIME_KEY;

    private VerifyCode checkExisted(String userId, String verificationCode) {
        VerifyCode verifyCode = verifyCodeRepository.findByUserIdAndVerifyCode(userId, verificationCode)
                .orElseThrow(() -> new AppException(ErrorCode.VERIFY_CODE_NOT_FOUND));
        return verifyCode;
    }

    private boolean checkExpiration(VerifyCode verifyCode) {
        return verifyCode.getExpirationTime().isBefore(java.time.LocalDateTime.now());
    }

    // verify both code and link
    @Override
    public boolean verify(String userId, String verificationCode) {
        VerifyCode verifyCode = checkExisted(userId, verificationCode);

        if (checkExpiration(verifyCode)) {
            verifyCodeRepository.delete(verifyCode);
            throw new AppException(ErrorCode.VERIFY_CODE_EXPIRED);
        }

        verifyCodeRepository.delete(verifyCode);
        return true;
    }

    @Override
    public void sendVerifyCode(SendVerificationRequest sendVerificationRequest) {
        User user = userRepository.findByEmail(sendVerificationRequest.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        VerifyCode verifyCode = verificationEmailService.sendCode(user);
        verifyCodeRepository.save(verifyCode);
    }

    @Override
    public void sendVerifyLink(SendVerificationRequest sendVerificationRequest) {
        User user = userRepository.findByEmail(sendVerificationRequest.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        VerifyCode verifyCode = verificationEmailService.sendRegistration(user);
        verifyCodeRepository.save(verifyCode);
    }

    @Override
    public String buildRedirectUrl(boolean success){
        StringBuilder url = success ? new StringBuilder(SUCCESS_REDIRECT_URL) : new StringBuilder(FAIL_REDIRECT_URL);

        Instant expirationTime = Instant.now().plus(1, ChronoUnit.HOURS);
        String expirationTimeStr = String.valueOf(expirationTime.toEpochMilli());
        String hashedExpiration = hashExpirationTime(expirationTimeStr);
        url.append("/").append(hashedExpiration);
        return url.toString();
    }

    @Override
    public void deleteVerifyCode(String userId, String verificationCode) {
        VerifyCode verifyCode = checkExisted(userId, verificationCode);
        verifyCodeRepository.delete(verifyCode);
    }


    // Used : hashExpirationTime
    // eg : '19820'
    // i = 0 --> timeStr[0]-'0' = 1 --> secretKey[1] = '#'
    // i = 1 --> timeStr[1]-'0' = 9 --> secretKey[9] = 'o'

    // decode
    // i = 0 --> '#' = secretKey[1] --> 1
    // i = 1 --> 'o' = secretKey[9] --> 9

    private String hashExpirationTime(String timeStr) {
        try {
            String secretKey = EXPIRATION_TIME_KEY;
            StringBuilder hashBuilder = new StringBuilder();

            for (int i = 0; i < timeStr.length(); i++) {
                hashBuilder.append(secretKey.charAt(timeStr.charAt(i) - '0'));
            }


            return hashBuilder.toString();
        } catch (Exception e) {
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
    }
}
