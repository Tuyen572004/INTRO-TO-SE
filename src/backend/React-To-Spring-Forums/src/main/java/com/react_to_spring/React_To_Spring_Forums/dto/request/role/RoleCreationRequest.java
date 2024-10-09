package com.react_to_spring.React_To_Spring_Forums.dto.request.role;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleCreationRequest {
    String name;
    String description;
    List<String> permissions;
}
