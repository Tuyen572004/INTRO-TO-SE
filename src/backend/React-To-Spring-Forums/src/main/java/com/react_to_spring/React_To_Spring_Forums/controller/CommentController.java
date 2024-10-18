package com.react_to_spring.React_To_Spring_Forums.controller;


import com.react_to_spring.React_To_Spring_Forums.dto.request.comment.CommentCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.comment.CommentUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.CommentResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.service.comment.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Comment Controller", description = "APIs for managing comments")
public class CommentController {

    @Autowired
    CommentService commentService;

    @GetMapping
    @Operation(summary = "Get all comments",
            description = "The results will include information about the comment and the user who created it")
    List<CommentResponse> getAllComments(@RequestParam(name = "post_id", required = false) String postId) {
        return commentService.getAllComments(postId);
    }

    @GetMapping("/pagination")
    @Operation(summary = "Get all comments with pagination",
            description = "The results will include information about the comment and the user who created it")
    PageResponse<CommentResponse> getAllCommentsWithPagination(@RequestParam(name = "post_id", required = false) String postId,
                                                               @RequestParam(name = "page") int page,
                                                               @RequestParam(name = "size") int size) {
        return commentService.getComments(postId, page, size);
    }

    @PostMapping
    @Operation(summary = "Create a comment",
            description = "Create a comment by providing user ID, post ID, and content")
    void createComment(@RequestBody CommentCreationRequest commentCreationRequest) {
        commentService.createComment(commentCreationRequest);
    }

    @PutMapping
    @Operation(summary = "Update a comment",
            description = "Update a comment by providing comment ID and new content")
    public void updateComment(@RequestBody CommentUpdateRequest commentUpdateRequest) {
        commentService.updateComment(commentUpdateRequest);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a comment",
            description = "Delete a comment by providing comment ID")
    public void deleteComment(@PathVariable(name = "id") String commentId) {
        commentService.deleteCommentById(commentId);
    }
}
