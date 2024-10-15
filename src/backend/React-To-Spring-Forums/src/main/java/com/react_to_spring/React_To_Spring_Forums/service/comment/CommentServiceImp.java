package com.react_to_spring.React_To_Spring_Forums.service.comment;

import com.react_to_spring.React_To_Spring_Forums.dto.request.comment.CommentCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.comment.CommentUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.CommentResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Comment;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.CommentMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.CommentRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.PostRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserProfileRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
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
            CommentResponse comment = commentMapper.toCommentResponse(item);

            Optional<UserProfile> userProfile = userProfileRepository.findByUserId(item.getUserId());
            if (userProfile.isEmpty()) continue;
            userProfile.ifPresent(value -> {
                comment.setAuthor(value.getFirstName() + " " + value.getLastName());
                comment.setAuthorAvatar(value.getProfileImgUrl());
            });

            commentResponses.add(comment);
        }

        return commentResponses;
    }

    @Override
    public CommentResponse createComment(CommentCreationRequest commentCreationRequest) {
        if (!userRepository.existsById(commentCreationRequest.getUserId())) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        if (!postRepository.existsById(commentCreationRequest.getPostId())) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }

        Comment comment = commentMapper.toComment(commentCreationRequest);
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        comment.setCreatedDate(currentTime);
        comment = commentRepository.save(comment);

        return commentMapper.toCommentResponse(comment);
    }

    @Override
    public CommentResponse updateComment(CommentUpdateRequest commentUpdateRequest) {
        Comment comment = commentRepository.findById(commentUpdateRequest.getId())
                .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));

        commentMapper.updateComment(comment, commentUpdateRequest);
        comment = commentRepository.save(comment);

        return commentMapper.toCommentResponse(comment);
    }

    @Override
    public void deleteCommentById(String commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new AppException(ErrorCode.COMMENT_NOT_FOUND);
        }

        commentRepository.deleteById(commentId);
    }
}
