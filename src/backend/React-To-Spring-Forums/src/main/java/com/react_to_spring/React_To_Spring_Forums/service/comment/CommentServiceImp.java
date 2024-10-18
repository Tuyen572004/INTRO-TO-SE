package com.react_to_spring.React_To_Spring_Forums.service.comment;

import com.react_to_spring.React_To_Spring_Forums.dto.request.comment.CommentCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.comment.CommentUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.CommentResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Comment;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.CommentMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.CommentRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.PostRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserProfileRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
import com.react_to_spring.React_To_Spring_Forums.utils.CheckData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class CommentServiceImp implements CommentService{
    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserProfileRepository userProfileRepository;

    @Autowired
    CommentMapper commentMapper;

    @Override
    public List<CommentResponse> getAllComments(String postId) {
        List<Comment> comments = commentRepository.findAllByPostId(postId);
        if (comments.isEmpty()) {
            throw new AppException(ErrorCode.COMMENT_NOT_FOUND);
        }

        List<CommentResponse> commentResponses = new ArrayList<>();
        for (Comment item : comments) {
            CommentResponse comment = builderCommentResponse(item);
            if (comment == null) continue;
            commentResponses.add(comment);
        }

        return commentResponses;
    }

    @Override
    public PageResponse<CommentResponse> getComments(String postId, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);

        Page<Comment> comments = commentRepository.findAllByPostId(postId, pageable);
        List<CommentResponse> commentResponses = new ArrayList<>();

        for (var item : comments.getContent()) {
            CommentResponse comment = builderCommentResponse(item);
            if (comment == null) continue;
            commentResponses.add(comment);
        }

        return PageResponse.<CommentResponse>builder()
                .page(page)
                .size(size)
                .totalElements(comments.getTotalElements())
                .totalPages(comments.getTotalPages())
                .data(commentResponses)
                .build();
    }

    @Override
    public CommentResponse createComment(CommentCreationRequest commentCreationRequest) {
        CheckData.checkContentEmpty(commentCreationRequest.getContent());
        if (!userRepository.existsById(commentCreationRequest.getUserId())) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        if (!postRepository.existsById(commentCreationRequest.getPostId())) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }

        Comment comment = commentMapper.toComment(commentCreationRequest);
        Date currentTime = new Date();
        comment.setCreatedDate(currentTime);
        comment = commentRepository.save(comment);

        return builderCommentResponse(comment);
    }

    @Override
    public CommentResponse updateComment(CommentUpdateRequest commentUpdateRequest) {
        CheckData.checkContentEmpty(commentUpdateRequest.getContent());
        Comment comment = commentRepository.findById(commentUpdateRequest.getId())
                .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));

        commentMapper.updateComment(comment, commentUpdateRequest);
        comment = commentRepository.save(comment);

        return builderCommentResponse(comment);
    }

    @Override
    public void deleteCommentById(String commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new AppException(ErrorCode.COMMENT_NOT_FOUND);
        }

        commentRepository.deleteById(commentId);
    }

    CommentResponse builderCommentResponse(Comment comment) {
        CommentResponse commentResponse = commentMapper.toCommentResponse(comment);

        Optional<UserProfile> userProfile = userProfileRepository.findByUserId(comment.getUserId());
        if (userProfile.isEmpty()) return null;
        userProfile.ifPresent(value -> {
            commentResponse.setAuthor(value.getFirstName() + " " + value.getLastName());
            commentResponse.setAuthorAvatar(value.getProfileImgUrl());
        });

        return commentResponse;
    }

}
