package com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.emailservice;


import com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.emaildto.EmailRequest;
import com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.emaildto.EmailResponse;

public interface EmailService {

    EmailResponse sendEmail(EmailRequest emailRequest);
}
