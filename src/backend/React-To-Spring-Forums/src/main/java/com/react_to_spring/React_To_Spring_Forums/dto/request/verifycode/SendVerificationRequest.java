package com.react_to_spring.React_To_Spring_Forums.dto.request.verifycode;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SendVerificationRequest {
    String email;
}
