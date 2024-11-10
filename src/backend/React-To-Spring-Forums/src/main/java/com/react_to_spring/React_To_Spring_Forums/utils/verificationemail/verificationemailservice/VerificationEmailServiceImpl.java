package com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.verificationemailservice;

import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.entity.VerifyCode;
import com.react_to_spring.React_To_Spring_Forums.repository.VerifyCodeRepository;
import com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.emaildto.Account;
import com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.emaildto.EmailRequest;
import com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.generator.VerificationEmailGenerator;
import com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.emailservice.EmailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@Service
@Qualifier("RegistrationVerificationEmailService")
@RequiredArgsConstructor
@FieldDefaults(level= AccessLevel.PRIVATE, makeFinal = true)
public class VerificationEmailServiceImpl implements VerificationEmailService {

    @Qualifier("RegistrationGenerator")
    VerificationEmailGenerator linkGenerator;

    @Qualifier("AccountUpdateGenerator")
    VerificationEmailGenerator codeGenerator;

    EmailService emailService;

    VerifyCodeRepository verifyCodeRepository;

    @NonFinal
    @Value("${app.email.sender.email}")
    String senderEmail;

    @NonFinal
    @Value("${app.email.sender.name}")
    String senderName;

    @NonFinal
    @Value("${app.email.subject}")
    String subject;

    private void buildGreeting(StringBuilder htmlContent) {
        htmlContent.append("<!DOCTYPE html> <html> <body>");
        htmlContent.append("<h1>Welcome to %s</h1>".formatted(senderName));
    }


    private String buildRegistrationHtmlContent(User user,VerifyCode verifyCode) {
        StringBuilder htmlContent = new StringBuilder();

        // get base url
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();

        // greeting
        buildGreeting(htmlContent);
        htmlContent.append("<p>Hello %s, </p>".formatted(user.getUsername()));

        // instruction to verify
        htmlContent.append("<p>Your verification code is: </p>");
        htmlContent.append("""
                <b>
                    <a href = "%s/verify?userId=%s&verificationCode=%s">Click here to verify</a>
                </b>
                """.formatted(baseUrl,user.getId(), verifyCode.getVerifyCode()));
        htmlContent.append("</body> </html>");

        return htmlContent.toString();
    }

    private String buildAccountUpdateHtmlContent(User use, VerifyCode verifyCode) {
        StringBuilder htmlContent = new StringBuilder();

        // get base url
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();

        // greeting
        buildGreeting(htmlContent);

        // instruction to verify
        htmlContent.append("<p>Your verification code is: %s</p>".formatted(verifyCode.getVerifyCode()));
        htmlContent.append("<p>Please use it to update your account</p>");

        return htmlContent.toString();
    }

    private EmailRequest buildEmailRequest(User user, String htmlContent) {

        System.out.println("email: " +user.getEmail());
        System.out.println("username: " +user.getUsername());

        return  EmailRequest.builder()
                .sender(Account.builder().email(senderEmail).name(senderName).build())
                .to(List.of(Account.builder().name(user.getUsername()).email(user.getEmail()).build()))
                .subject(subject)
                .htmlContent(htmlContent)
                .build();
    }


    @Override
    public void sendRegistration(User user) {
        VerifyCode verifyCode = linkGenerator.generateVerifyCode(user);
        String htmlContent = buildRegistrationHtmlContent(user, verifyCode);
        EmailRequest emailRequest = buildEmailRequest(user, htmlContent);


        // send email
        emailService.sendEmail(emailRequest);
        verifyCodeRepository.save(verifyCode);
    }

    @Override
    public void sendCode(User user) {
        VerifyCode verifyCode = codeGenerator.generateVerifyCode(user);
        String htmlContent = buildAccountUpdateHtmlContent(user, verifyCode);
        EmailRequest emailRequest = buildEmailRequest(user, htmlContent);

        // send email
        emailService.sendEmail(emailRequest);
        verifyCodeRepository.save(verifyCode);
    }
}