package com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.emailservice;

import com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.emaildto.EmailRequest;
import com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.emaildto.EmailResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

//@FeignClient(name = "email-client", url="${app.email.host}")
//public interface EmailClient {
//    @PostMapping(value = "${app.email.endpoint}", produces = MediaType.APPLICATION_JSON_VALUE)
//    EmailResponse sendEmail(@RequestHeader("api-key") String apiKey, @RequestBody EmailRequest body);
//}

@FeignClient(name = "email-client", url="https://api.brevo.com")
public interface EmailClient {
    @PostMapping(value = "/v3/smtp/email", produces = MediaType.APPLICATION_JSON_VALUE)
    EmailResponse sendEmail(@RequestHeader("api-key") String apiKey, @RequestBody EmailRequest body);
}

