package com.react_to_spring.React_To_Spring_Forums.service.react;

import com.react_to_spring.React_To_Spring_Forums.dto.response.ReactResponse;
import org.springframework.stereotype.Service;

@Service
public interface ReactService {
    ReactResponse createReact(String postId);

    void deleteReactByPostId(String postId);

    ReactResponse getReactByPostId(String postId);
}
