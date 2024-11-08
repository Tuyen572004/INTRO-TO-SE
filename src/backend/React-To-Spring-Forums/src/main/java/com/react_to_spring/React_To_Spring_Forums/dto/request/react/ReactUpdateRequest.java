package com.react_to_spring.React_To_Spring_Forums.dto.request.react;

import com.react_to_spring.React_To_Spring_Forums.enums.ReactName;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReactUpdateRequest {
        @NotNull(message = "REQUIRED_REACT_ID")
        String id;

        @NotNull(message = "REQUIRED_REACT_NAME")
        ReactName name;
}
