package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.service.verifycode.VerifyCodeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/verify")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Tag(name = "Verify Code Controller", description = "APIs for verification code management")
public class VerifyCodeController {

    VerifyCodeService verifyCodeService;


    @GetMapping()
    @Operation(summary = "Verify code",
            description = "Verify code when user clicks on the link in the email")
    public ApiResponse<Object> verifyCode(@RequestParam("userId") String userId, @RequestParam("verificationCode") String verficationCode) {
        if(verifyCodeService.verifyLink(userId, verficationCode)){
            return ApiResponse.builder()
                    .message("Verification successful")
                    .build();
        }

        // if expired (invalid will throw exception)
        return ApiResponse.builder()
                .code(ErrorCode.VERIFY_CODE_EXPIRED.getCode())
                .message(ErrorCode.VERIFY_CODE_EXPIRED.getMessage())
                .build();

    }

    @PostMapping()
    @Operation(summary = "Send verification code",
            description = "Send verification code to user's email when user choose send code")
    public ApiResponse<Object> sendVerifyCode(@RequestBody User user) {
        verifyCodeService.sendVerifyCode(user);
        return ApiResponse.builder()
                .message("Verification code sent")
                .build();
    }



}
