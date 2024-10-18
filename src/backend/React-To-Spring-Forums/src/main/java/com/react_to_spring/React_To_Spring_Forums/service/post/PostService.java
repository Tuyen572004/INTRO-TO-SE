package com.react_to_spring.React_To_Spring_Forums.service.post;

import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PostResponse;

import java.util.List;

public interface PostService {
    List<PostResponse> getAllPosts(String title);

    PageResponse<PostResponse> getPosts(int page, int size);

    PostResponse createPost(PostCreationRequest postCreationRequest);

    PostResponse updatePost(PostUpdateRequest postUpdateRequest);

    void deletePostById(String id);
}
