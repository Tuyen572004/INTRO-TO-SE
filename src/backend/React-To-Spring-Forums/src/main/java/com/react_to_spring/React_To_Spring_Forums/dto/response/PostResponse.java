package com.react_to_spring.React_To_Spring_Forums.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.sql.Date;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {
    String title;
    String content;
    String imageURL;
    Date createdDate;
    Integer reactCounts;
}
