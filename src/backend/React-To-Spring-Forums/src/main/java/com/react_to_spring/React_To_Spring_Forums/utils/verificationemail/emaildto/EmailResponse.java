package com.react_to_spring.React_To_Spring_Forums.utils.verificationemail.emaildto;

import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import lombok.Builder;

@Builder
public class EmailResponse{
    String code;
    String message;
}
