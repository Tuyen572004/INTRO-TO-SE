package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.verifycode.SendVerificationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.service.verifycode.VerifyCodeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;


import java.io.IOException;
import java.time.temporal.ChronoUnit;
import java.util.Base64;

@RestController
@RequestMapping("/verify")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Tag(name = "Verify Code Controller", description = "APIs for verification code management")
public class VerifyCodeController {

    VerifyCodeService verifyCodeService;


    @GetMapping()
    @Operation(summary = "Verify code",
            description = "Verify code and redirect to success/failure page")
    public ApiResponse<Object> verify(@RequestParam("userId") String userId,
                                      @RequestParam("verificationCode") String verficationCode,
                                      HttpServletResponse response) throws IOException {

        if(verifyCodeService.verify(userId, verficationCode)){
            // Redirect to success page
            String successUrl=verifyCodeService.buildRedirectUrl(true);
            response.sendRedirect(successUrl);

            return ApiResponse.builder()
                    .message("Verification successful")
                    .build();
        }

        // Redirect to failure page
        String failureUrl = verifyCodeService.buildRedirectUrl(false);
        response.sendRedirect(failureUrl);

        return ApiResponse.builder()
                .code(ErrorCode.VERIFY_CODE_EXPIRED.getCode())
                .message(ErrorCode.VERIFY_CODE_EXPIRED.getMessage())
                .build();

    }

    @PostMapping("/send-code")
    @Operation(summary = "Send verification code",
            description = "Send verification code to user's email when user request to change password or email")
    public ApiResponse<Object> sendVerifyCode(@RequestBody SendVerificationRequest sendVerificationRequest) {
        verifyCodeService.sendVerifyCode(sendVerificationRequest);
        return ApiResponse.builder()
                .message("Verification code sent")
                .build();
    }

    @PostMapping("/send-link")
    @Operation(summary = "Send verification link",
            description = "Send verification link to user's email when user request to register account")
    public ApiResponse<Object> sendVerifyLink(@RequestBody SendVerificationRequest sendVerificationRequest) {
        verifyCodeService.sendVerifyLink(sendVerificationRequest);
        return ApiResponse.builder()
                .message("Verification link sent")
                .build();
    }

    @DeleteMapping("/delete-code")
    @Operation(summary = "Delete verification code",
            description = "Delete verification code when user cancelling operation such as change password or email")
    public ApiResponse<Object> deleteVerifyCode(@RequestParam("userId") String userId,
                                                @RequestParam("verificationCode") String verificationCode) {
        verifyCodeService.deleteVerifyCode(userId, verificationCode);
        return ApiResponse.builder()
                .message("Verification code deleted")
                .build();
    }

}
