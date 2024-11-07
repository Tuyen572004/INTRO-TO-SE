package com.react_to_spring.React_To_Spring_Forums.converter;

import com.react_to_spring.React_To_Spring_Forums.dto.response.PostResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Post;
import com.react_to_spring.React_To_Spring_Forums.entity.React;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.mapper.PostMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.CommentRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.ReactRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
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

        // get author's name and avatar (url)
        Optional<UserProfile> userProfile = userProfileRepository.findByUserId(post.getUserId());
        if (userProfile.isEmpty()) return null;
        userProfile.ifPresent(value -> {
            postResponse.setAuthor(value.getFirstName() + " " + value.getLastName());
            postResponse.setAuthorAvatar(value.getProfileImgUrl());
        });

        // get reacts
        List<React> reacts = reactRepository.findAllByPostId(post.getId());
        Map<String, Integer> reactMap = new HashMap<>();
        for (React react : reacts) {
            String reactName = react.getName().toString();
            reactMap.put(reactName, reactMap.getOrDefault(reactName, 0) + 1);
        }
        postResponse.setReacts(reactMap);

        // get comment counts
        postResponse.setCommentCounts(commentRepository.countByPostId(post.getId()));

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
