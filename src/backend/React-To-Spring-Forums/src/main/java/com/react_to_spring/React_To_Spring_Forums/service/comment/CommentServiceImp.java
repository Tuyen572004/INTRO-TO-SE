package com.react_to_spring.React_To_Spring_Forums.service.comment;

import com.react_to_spring.React_To_Spring_Forums.dto.request.comment.CommentCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.comment.CommentUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.CommentResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Comment;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.CommentMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.CommentRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.PostRepository;
import com.react_to_spring.React_To_Spring_Forums.converter.CommentConverter;
import com.react_to_spring.React_To_Spring_Forums.utils.StringUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentServiceImp implements CommentService{

    PostRepository postRepository;
    CommentRepository commentRepository;
    CommentMapper commentMapper;
    CommentConverter commentConverter;

    @Override
    public List<CommentResponse> getAllComments(String postId) {
        List<Comment> comments = commentRepository.findAllByPostId(postId);
        return commentConverter.convertToCommentResponses(comments);
    }

    @Override
    public PageResponse<CommentResponse> getComments(String postId, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);

        Page<Comment> comments = commentRepository.findAllByPostId(postId, pageable);
        List<CommentResponse> commentResponses = commentConverter.convertToCommentResponses(comments.getContent());

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
        if (StringUtil.isEmpty(commentCreationRequest.getContent())) {
            throw new AppException(ErrorCode.CONTENT_IS_EMPTY);
        }
        if (!postRepository.existsById(commentCreationRequest.getPostId())) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        Comment comment = commentMapper.toComment(commentCreationRequest);
        LocalDateTime currentTime = LocalDateTime.now();
        comment.setCreatedDate(currentTime);
        comment.setUserId(userId);

        comment = commentRepository.save(comment);

        return commentConverter.buildCommentResponse(comment);
    }

    @Override
    public CommentResponse updateComment(CommentUpdateRequest commentUpdateRequest) {
        if (StringUtil.isEmpty(commentUpdateRequest.getContent())) {
            throw new AppException(ErrorCode.CONTENT_IS_EMPTY);
        }
        Comment comment = commentRepository.findById(commentUpdateRequest.getId())
                .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));

        commentMapper.updateComment(comment, commentUpdateRequest);
        comment = commentRepository.save(comment);

        return commentConverter.buildCommentResponse(comment);
    }

    @Override
    public void deleteCommentById(String commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new AppException(ErrorCode.COMMENT_NOT_FOUND);
        }

        commentRepository.deleteById(commentId);
    }


}
