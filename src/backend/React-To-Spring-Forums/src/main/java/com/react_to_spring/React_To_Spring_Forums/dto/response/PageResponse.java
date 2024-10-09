package com.react_to_spring.React_To_Spring_Forums.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.Collections;
import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PageResponse <T> {
    Integer page;
    Integer size;
    Long totalElements;
    Integer totalPages;

    @Builder.Default
    List<T> data = Collections.emptyList();
}
