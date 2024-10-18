package com.react_to_spring.React_To_Spring_Forums.controller;


import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PostResponse;
import com.react_to_spring.React_To_Spring_Forums.service.post.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Post Controller", description = "APIs for managing posts")
public class PostController {
    @NonFinal
    @Value("Post deleted successfully")
    String DELETE_SUCCESS;

    @Autowired
    PostService postService;

    @GetMapping
    @Operation(summary = "Get all posts by title",
            description = "The results will include information about the post and the user who created it")
    public ApiResponse<List<PostResponse>> getAllPostsByTitle(@RequestParam(name = "title") String title){
        return ApiResponse.<List<PostResponse>>builder()
                .data(postService.getAllPosts(title))
                .build();
    }


    @GetMapping("/pagination")
    @Operation(summary = "Get all posts with pagination",
            description = "The results will include information about the post and the user who created it")
    public ApiResponse<PageResponse<PostResponse>> getPosts(@RequestParam(name = "title") String title,
                                               @RequestParam(value = "page") int page,
                                               @RequestParam("size") int size) {
        return ApiResponse.<PageResponse<PostResponse>>builder()
                .data(postService.getPosts(title, page, size))
                .build();
    }

    @PostMapping
    @Operation(summary = "Create a post",
            description = "Create a post by providing user ID and information: title, content, and image")
    public ApiResponse<PostResponse> createPost(@RequestBody PostCreationRequest postCreationRequest) {
        return ApiResponse.<PostResponse>builder()
                .data(postService.createPost(postCreationRequest))
                .build();
    }

    @PutMapping
    @Operation(summary = "Update a post",
            description = "Update a post by providing post ID and new information: title, content, image")
    public ApiResponse<PostResponse> updatePost(@RequestBody PostUpdateRequest postUpdateRequest) {
        return ApiResponse.<PostResponse>builder()
                .data(postService.updatePost(postUpdateRequest))
                .build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a post",
            description = "Delete a post by providing post ID")
    public ApiResponse<Void> deletePost(@PathVariable(name = "id") String postId) {
        postService.deletePostById(postId);
        return ApiResponse.<Void>builder()
                .message(DELETE_SUCCESS)
                .build();
    }
}

