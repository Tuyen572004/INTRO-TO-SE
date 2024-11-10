package com.react_to_spring.React_To_Spring_Forums.service.verifycode;

import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.entity.VerifyCode;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.VerifyCodeRepository;
import com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.verificationemailservice.VerificationEmailService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class VerifyCodeServiceImpl implements VerifyCodeService {

    VerifyCodeRepository verifyCodeRepository;

    VerificationEmailService verificationEmailService;

    UserRepository userRepository;

    private VerifyCode checkExisted(String userId, String verificationCode) {
        VerifyCode verifyCode = verifyCodeRepository.findByUserIdAndVerifyCode(userId, verificationCode)
                .orElseThrow(() -> new AppException(ErrorCode.VERIFY_CODE_NOT_FOUND));
        return verifyCode;
    }

    private boolean checkExpiration(VerifyCode verifyCode) {
        return verifyCode.getExpirationTime().isBefore(java.time.LocalDateTime.now());
    }

    @Override
    public boolean verifyCode(String userId, String verificationCode) {
        // check existed
        VerifyCode verifyCode = checkExisted(userId, verificationCode);

        // check expiration time
        if (checkExpiration(verifyCode)) {
            verifyCodeRepository.delete(verifyCode);
            sendVerifyCode();

            return false;
        }

        // all info is correct -> delete the code and return success
        verifyCodeRepository.delete(verifyCode);
        return true;
    }

    @Override
    public boolean verifyLink(String userId, String verificationCode) {
        // check existed
        VerifyCode verifyCode = checkExisted(userId, verificationCode);

        // check expiration time
        if (checkExpiration(verifyCode)) {
            verifyCodeRepository.delete(verifyCode);
            sendVerifyLink(verifyCode.getUser());
            return false;
        }

        // all info is correct -> delete the code and return success
        verifyCodeRepository.delete(verifyCode);
        return true;
    }

    @Override
    public void sendVerifyCode() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        verificationEmailService.sendCode(user);
    }

    @Override
    public void sendVerifyLink(User user) {
        verificationEmailService.sendRegistration(user);
    }

}
