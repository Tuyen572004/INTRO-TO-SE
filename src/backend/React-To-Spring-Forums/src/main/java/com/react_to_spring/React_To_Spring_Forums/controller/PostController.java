package com.react_to_spring.React_To_Spring_Forums.controller;


import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PostResponse;
import com.react_to_spring.React_To_Spring_Forums.service.post.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Post Controller", description = "APIs for managing posts")
public class PostController {

    @Autowired
    PostService postService;


    @GetMapping
    public List<PostResponse> getAllPostsByTitle(@RequestParam(name = "title") String title){
        return postService.getAllPosts(title);
    }

    @PostMapping
    public void createPost(@RequestBody PostCreationRequest postCreationRequest) {
        postService.createPost(postCreationRequest);
    }

    @PutMapping
    public void updatePost(@RequestBody PostUpdateRequest postUpdateRequest) {
        postService.updatePost(postUpdateRequest);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable(name = "id") String postId) {
        /*
            Đoạn này phải xóa những comment và react liên quan đến post này
         */
        postService.deletePostById(postId);
    }
}

