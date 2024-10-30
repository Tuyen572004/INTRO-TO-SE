package com.react_to_spring.React_To_Spring_Forums.controller;


import com.react_to_spring.React_To_Spring_Forums.dto.request.comment.CommentCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.comment.CommentUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.CommentResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.service.comment.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Comment Controller", description = "APIs for managing comments")
public class CommentController {
    @NonFinal
    @Value("Comment deleted successfully")
    String DELETE_SUCCESS;

    @Autowired
    CommentService commentService;

    @GetMapping
    @Operation(summary = "Get all comments",
            description = "The results will include information about the comment and the user who created it")
    ApiResponse<List<CommentResponse>> getAllComments(@RequestParam(name = "post_id") @NotNull(message = "REQUIRED_POST_ID") String postId) {
        return ApiResponse.<List<CommentResponse>>builder()
                .data(commentService.getAllComments(postId))
                .build();
    }

    @GetMapping("/pagination")
    @Operation(summary = "Get all comments with pagination",
            description = "The results will include information about the comment and the user who created it")
    ApiResponse<PageResponse<CommentResponse>> getAllCommentsWithPagination(@RequestParam(name = "post_id") @NotNull(message = "REQUIRED_POST_ID") String postId,
                                                               @RequestParam(name = "page")  int page,
                                                               @RequestParam(name = "size") int size) {
        return ApiResponse.<PageResponse<CommentResponse>>builder()
                .data(commentService.getComments(postId, page, size))
                .build();
    }

    @PostMapping
    @Operation(summary = "Create a comment",
            description = "Create a comment by providing user ID, post ID, and content")
    public ApiResponse<CommentResponse> createComment(@Valid @RequestBody CommentCreationRequest commentCreationRequest) {
        return ApiResponse.<CommentResponse>builder()
                .data(commentService.createComment(commentCreationRequest))
                .build();
    }

    @PutMapping
    @Operation(summary = "Update a comment",
            description = "Update a comment by providing comment ID and new content")
    public ApiResponse<CommentResponse> updateComment(@Valid @RequestBody CommentUpdateRequest commentUpdateRequest) {
        return ApiResponse.<CommentResponse>builder()
                .data(commentService.updateComment(commentUpdateRequest))
                .build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a comment",
            description = "Delete a comment by providing comment ID")
    public ApiResponse<Void> deleteComment(@PathVariable(name = "id") @NotNull String commentId) {
        commentService.deleteCommentById(commentId);
        return ApiResponse.<Void>builder()
                .message(DELETE_SUCCESS)
                .build();
    }
}
