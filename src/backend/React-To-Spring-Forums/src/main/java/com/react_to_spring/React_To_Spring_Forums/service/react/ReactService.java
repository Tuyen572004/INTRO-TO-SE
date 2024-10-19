package com.react_to_spring.React_To_Spring_Forums.service.react;


import com.react_to_spring.React_To_Spring_Forums.dto.request.react.ReactCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.react.ReactUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ReactResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReactService {
    ReactResponse createReact(ReactCreationRequest request);

    List<ReactResponse> getReactsByPostId(String postId);

    ReactResponse getReactByPostIdAndUserId(String postId, String userId);

    ReactResponse updateReact(ReactUpdateRequest request);

    void deleteReactsByPostId(String postId);

    void deleteReactById(String id);
}
