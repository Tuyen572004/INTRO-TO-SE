package com.react_to_spring.React_To_Spring_Forums.converter;

import com.react_to_spring.React_To_Spring_Forums.dto.response.CommentResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Comment;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.mapper.CommentMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class CommentConverter {

    CommentMapper commentMapper;
    UserProfileRepository userProfileRepository;

    public List<CommentResponse> convertToCommentResponses(List<Comment> comments){
        List<CommentResponse> commentResponses = new ArrayList<>();
        for (Comment item : comments) {
            CommentResponse comment = buildCommentResponse(item);
            if (comment == null) continue;
            commentResponses.add(comment);
        }

        return commentResponses;
    }

    public CommentResponse buildCommentResponse(Comment comment) {
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
