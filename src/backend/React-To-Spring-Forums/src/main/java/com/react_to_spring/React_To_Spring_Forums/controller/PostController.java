package com.react_to_spring.React_To_Spring_Forums.controller;


import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PostResponse;
import com.react_to_spring.React_To_Spring_Forums.service.post.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
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
    @Value("${app.controller.post.response.delete.success}")
    String DELETE_SUCCESS;

    @NonFinal
    @Value("${app.controller.post.response.update.success}")
    String UPDATE_SUCCESS;

    @NonFinal
    @Value("${app.controller.post.response.create.success}")
    String CREATE_SUCCESS;

    PostService postService;

    @GetMapping("/{id}")
    @Operation(summary = "Get post by ID",
            description = "The results will include information about the post and the user who created it")
    public ApiResponse<PostResponse> getPostById(@PathVariable(name = "id") @NotNull String postId) {
        return ApiResponse.<PostResponse>builder()
                .data(postService.getPostById(postId))
                .build();
    }

    @GetMapping("/my-posts")
    public ApiResponse<PageResponse<PostResponse>> getMyPosts(
            @RequestParam(value = "page", required = false, defaultValue = "1") @Min(0) int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return ApiResponse.<PageResponse<PostResponse>>builder()
                .data(postService.getMyPosts(page, size))
                .build();
    }


    @GetMapping("/dashboard")
    @Operation(summary = "Get all posts by not like user ID",
            description = "The results will include information about the post and the user who created it")
    public ApiResponse<PageResponse<PostResponse>> getPostsDashboard(
            @RequestParam(value = "page", required = false, defaultValue = "1") @Min(0) int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return ApiResponse.<PageResponse<PostResponse>>builder()
                .data(postService.getPostsDashboard(page, size))
                .build();
    }

    @GetMapping("/random")
    @Operation(summary = "Get random posts",
            description = "The results will include information about the post and the user who created it")
    public ApiResponse<List<PostResponse>> getRandomPosts(
            @RequestParam(value = "size", required = false, defaultValue = "10") int size
    ) {
        return ApiResponse.<List<PostResponse>>builder()
                .data(postService.getRandomPosts(size))
                .build();
    }

    @GetMapping
    @Operation(summary = "Get all posts by title",
            description = "The results will include information about the post and the user who created it")
    public ApiResponse<List<PostResponse>> getAllPostsByTitle(@RequestParam(name = "title") String title){
        return ApiResponse.<List<PostResponse>>builder()
                .data(postService.getAllPostsByTitle(title))
                .build();
    }


    @GetMapping("/pagination")
    @Operation(summary = "Get all posts with pagination",
            description = "The results will include information about the post and the user who created it")
    public ApiResponse<PageResponse<PostResponse>> getPaginatedPostsByTitle(
            @RequestParam(name = "title") String title,
            @RequestParam(value = "page", required = false, defaultValue = "1") @Min(0) int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size)
    {
        return ApiResponse.<PageResponse<PostResponse>>builder()
                .data(postService.getPostsByTitle(title, page, size))
                .build();
    }

    @GetMapping("/users/{id}")
    @Operation(summary = "Get all posts by user ID",
            description = "The results will include information about the post and the user who created it")
    public ApiResponse<List<PostResponse>> getAllPostsByUserId(@PathVariable(name = "id") @NotNull String userId){
        return ApiResponse.<List<PostResponse>>builder()
                .data(postService.getAllPostsByUserId(userId))
                .build();
    }

    @GetMapping("/pagination/users/{id}")
    @Operation(summary = "Get all posts by user ID with pagination",
            description = "The results will include information about the post and the user who created it")
    public ApiResponse<PageResponse<PostResponse>> getPaginatedPostsByUserId(
            @PathVariable(name = "id") @NotNull String userId,
            @RequestParam(value = "page", required = false, defaultValue = "1") @Min(0) int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size)
    {
        return ApiResponse.<PageResponse<PostResponse>>builder()
                .data(postService.getPostsByUserId(userId, page, size))
                .build();
    }


    @PostMapping
    @Operation(summary = "Create a post",
            description = "Create a post by providing user ID and information: title, content, and image")
    public ApiResponse<PostResponse> createPost(@Valid @RequestBody PostCreationRequest postCreationRequest) {
        return ApiResponse.<PostResponse>builder()
                .data(postService.createPost(postCreationRequest))
                .message(CREATE_SUCCESS)
                .build();
    }

    @PutMapping
    @Operation(summary = "Update a post",
            description = "Update a post by providing post ID and new information: title, content, image")
    public ApiResponse<PostResponse> updatePost(@Valid @RequestBody PostUpdateRequest postUpdateRequest) {
        return ApiResponse.<PostResponse>builder()
                .data(postService.updatePost(postUpdateRequest))
                .message(UPDATE_SUCCESS)
                .build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a post",
            description = "Delete a post by providing post ID")
    public ApiResponse<Void> deletePost(@PathVariable(name = "id") @NotNull String postId) {
        postService.deletePostById(postId);
        return ApiResponse.<Void>builder()
                .message(DELETE_SUCCESS)
                .build();
    }
}

