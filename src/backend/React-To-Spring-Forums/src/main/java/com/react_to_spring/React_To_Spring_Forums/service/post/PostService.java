package com.react_to_spring.React_To_Spring_Forums.service.post;

import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PostResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Post;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface PostService {
    PostResponse getPostById(String id);

    PageResponse<PostResponse> getMyPosts(int page, int size);

    List<PostResponse> getAllPostsByTitle(String title);

    PageResponse<PostResponse> getPostsByTitle(String title, int page, int size);

    List<PostResponse> getAllPostsByUserId(String userId);

    PageResponse<PostResponse> getPostsByUserId(String userId, int page, int size);

    PageResponse<PostResponse> getPostsDashboard(int page, int size);

    PostResponse createPost(PostCreationRequest postCreationRequest);

    PostResponse updatePost(PostUpdateRequest postUpdateRequest);

    void deletePostById(String id);

    List<PostResponse> getRandomPosts(int size);

    Long getPostCount();
}
