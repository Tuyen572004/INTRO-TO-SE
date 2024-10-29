package com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.emailservice;

import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.emaildto.EmailRequest;
import com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.emaildto.EmailResponse;
import feign.FeignException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class EmailServiceImpl implements EmailService{

    @NonFinal
    @Value("${app.email.API-key}")
    String apiKey;

    EmailClient emailClient;

    @Override
    public EmailResponse sendEmail(EmailRequest emailRequest) {
//        System.out.println("Sending email...");
//        System.out.println(emailRequest);
        try {

            return emailClient.sendEmail(apiKey, emailRequest);
        } catch (FeignException e){
            throw new AppException(ErrorCode.CANNOT_SEND_EMAIL);
        }
    }
}
