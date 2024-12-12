package com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost;

import lombok.*;
import lombok.experimental.FieldDefaults;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReportViolatingPostRequestDTO {
    String postId;
    String reason;
}
