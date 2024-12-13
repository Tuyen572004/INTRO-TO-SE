package com.react_to_spring.React_To_Spring_Forums.converter;

import com.react_to_spring.React_To_Spring_Forums.dto.response.PostResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserInfoResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Post;
import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.mapper.PostMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.CommentRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.ReactRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserProfileRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.util.*;
import java.util.regex.Pattern;


@Slf4j
@Component
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class PostConverter {

    PostMapper postMapper;
    UserRepository userRepository;
    UserProfileRepository userProfileRepository;
    ReactRepository reactRepository;
    CommentRepository commentRepository;

    public List<PostResponse> convertToPostResponses(List<Post> posts) {
        List<PostResponse> postResponses = new ArrayList<>();
        for (Post post : posts) {
            PostResponse postResponse = buildPostResponse(post);
            if (postResponse == null) continue;
            postResponses.add(postResponse);
        }

        return postResponses;
    }

    public PostResponse buildPostResponse(Post post) {
        PostResponse postResponse = postMapper.toPostResponse(post);

        UserInfoResponse userInfo = UserInfoResponse.builder().name("").username("").avatar("").build();
        userInfo.setId(post.getUserId());

        Optional<UserProfile> userProfile = userProfileRepository.findByUserId(post.getUserId());
        Optional<User> user = userRepository.findById(post.getUserId());

        // get author's name and avatar (url)
        if (userProfile.isEmpty() || user.isEmpty()) return null;
        userProfile.ifPresent(value -> {
            userInfo.setName(value.getFirstName() + " " + value.getLastName());
            userInfo.setAvatar(value.getProfileImgUrl());
        });
        user.ifPresent(value -> {
            userInfo.setUsername(value.getUsername());
        });
        postResponse.setUser(userInfo);

        // get react counts
        postResponse.setReactCounts(reactRepository.countByPostId(post.getId()));
        // get comment counts
        postResponse.setCommentCounts(commentRepository.countByPostId(post.getId()));

        // check if user reacted to this post
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        boolean isReacted = reactRepository.existsByUserIdAndPostId(userId, post.getId());
        postResponse.setIsReacted(isReacted);

        return postResponse;
    }

    public String removeDiacritics(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");

        return pattern.matcher(normalized).replaceAll("");
    }

    public String buildRegex(String input) {
        String noDiacritics = removeDiacritics(input);

        // split input into words
        String[] words = noDiacritics.split("\\s+");
        StringBuilder regexBuilder = new StringBuilder();
        for (String word : words) {
            regexBuilder.append("(?=.*").append(word).append(")");
        }
        regexBuilder.append(".*");

        return regexBuilder.toString();
    }
}
