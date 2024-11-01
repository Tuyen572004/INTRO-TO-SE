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
@RequestMapping("/comments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Comment Controller", description = "APIs for managing comments")
public class CommentController {
    @NonFinal
    @Value("${app.controller.comment.response.delete.success}")
    String DELETE_SUCCESS;

    @NonFinal
    @Value("${app.controller.comment.response.update.success}")
    String UPDATE_SUCCESS;

    @NonFinal
    @Value("${app.controller.comment.response.create.success}")
    String CREATE_SUCCESS;

    CommentService commentService;

    @GetMapping
    @Operation(summary = "Get all comments by post ID",
            description = "The results will include information about the comment and the user who created it")
    ApiResponse<List<CommentResponse>> getAllComments(@RequestParam(name = "post_id") @NotNull(message = "REQUIRED_POST_ID") String postId) {
        return ApiResponse.<List<CommentResponse>>builder()
                .data(commentService.getAllComments(postId))
                .build();
    }

    @GetMapping("/pagination")
    @Operation(summary = "Get all comments by post ID with pagination",
            description = "The results will include information about the comment and the user who created it")
    ApiResponse<PageResponse<CommentResponse>> getAllCommentsWithPagination(
            @RequestParam(name = "post_id") @NotNull(message = "REQUIRED_POST_ID") String postId,
            @RequestParam(name = "page", required = false, defaultValue = "1") @Min(0) int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size) {
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
                .message(CREATE_SUCCESS)
                .build();
    }

    @PutMapping
    @Operation(summary = "Update a comment",
            description = "Update a comment by providing comment ID and new content")
    public ApiResponse<CommentResponse> updateComment(@Valid @RequestBody CommentUpdateRequest commentUpdateRequest) {
        return ApiResponse.<CommentResponse>builder()
                .data(commentService.updateComment(commentUpdateRequest))
                .message(UPDATE_SUCCESS)
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
