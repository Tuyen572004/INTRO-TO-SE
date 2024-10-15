package com.react_to_spring.React_To_Spring_Forums.service.comment;

import com.react_to_spring.React_To_Spring_Forums.dto.request.comment.CommentCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.comment.CommentUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.CommentResponse;

import java.util.List;

public interface CommentService {
    List<CommentResponse> getAllComments(String postId);

    CommentResponse createComment(CommentCreationRequest commentCreationRequest);

    CommentResponse updateComment(CommentUpdateRequest commentUpdateRequest);

    void deleteCommentById(String commentId);
}
