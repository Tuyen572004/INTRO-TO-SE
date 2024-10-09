package com.react_to_spring.React_To_Spring_Forums.dto.request.permission;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PermissionUpdateRequest {
    String description;
}
