package com.react_to_spring.React_To_Spring_Forums.service.post;

import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PostResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Post;
import com.react_to_spring.React_To_Spring_Forums.entity.React;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.PostMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.*;
import com.react_to_spring.React_To_Spring_Forums.utils.CheckData;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.regex.Pattern;


@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostServiceImp implements PostService {

    private PostRepository postRepository;
    private PostMapper postMapper;
    private UserRepository userRepository;
    private UserProfileRepository userProfileRepository;
    private CommentRepository commentRepository;
    private ReactRepository reactRepository;

    @Override
    public PostResponse getPostById(String id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));

        return buildPostResponse(post);
    }

    @Override
    public PageResponse<PostResponse> getMyPosts(int page, int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Sort sort = Sort.by(Sort.Direction.DESC, "createdDate");
        String userId = authentication.getName();

        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<Post> posts = postRepository.findAllByUserId(userId, pageable);

        List<PostResponse> postResponses = new ArrayList<>();
        for (Post item : posts.getContent()) {
            PostResponse postResponse = buildPostResponse(item);
            if (postResponse == null) continue;
            postResponses.add(postResponse);
        }

        return PageResponse.<PostResponse>builder()
                .page(page)
                .size(size)
                .totalElements(posts.getTotalElements())
                .totalPages(posts.getTotalPages())
                .data(postResponses)
                .build();
    }

    @Override
    public List<PostResponse> getAllPostsByTitle(String title) {
        List<Post> posts = postRepository.findByTitleNoDiacriticsApproximate(buildRegex(title));
        if (posts.isEmpty()) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }

        List<PostResponse> postResponses = new ArrayList<>();
        for (Post item : posts) {
            PostResponse postResponse = buildPostResponse(item);
            if (postResponse == null) continue;
            postResponses.add(postResponse);
        }

        return postResponses;
    }

    @Override
    public PageResponse<PostResponse> getPostsByTitle(String title, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Post> posts = postRepository.findByTitleNoDiacriticsApproximate(buildRegex(title), pageable);

        List<PostResponse> postResponses = new ArrayList<>();
        for (Post item : posts.getContent()) {
            PostResponse postResponse = buildPostResponse(item);
            if (postResponse == null) continue;
            postResponses.add(postResponse);
        }

        return PageResponse.<PostResponse>builder()
                .page(page)
                .size(size)
                .totalElements(posts.getTotalElements())
                .totalPages(posts.getTotalPages())
                .data(postResponses)
                .build();
    }

    @Override
    public List<PostResponse> getAllPostsByUserId(String userId) {
        if (!userRepository.existsById(userId)) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        List<Post> posts = postRepository.findByUserId(userId);
        if (posts.isEmpty()) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }

        List<PostResponse> postResponses = new ArrayList<>();
        for (Post item : posts) {
            PostResponse postResponse = buildPostResponse(item);
            if (postResponse == null) continue;
            postResponses.add(postResponse);
        }

        return postResponses;
    }

    @Override
    public PageResponse<PostResponse> getPostsByUserId(String userId, int page, int size) {
        if (!userRepository.existsById(userId)) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Post> posts = postRepository.findAllByUserId(userId, pageable);

        List<PostResponse> postResponses = new ArrayList<>();
        for (Post item : posts.getContent()) {
            PostResponse postResponse = buildPostResponse(item);
            if (postResponse == null) continue;
            postResponses.add(postResponse);
        }

        return PageResponse.<PostResponse>builder()
                .page(page)
                .size(size)
                .totalElements(posts.getTotalElements())
                .totalPages(posts.getTotalPages())
                .data(postResponses)
                .build();
    }

    @Override
    public PostResponse createPost(PostCreationRequest postCreationRequest) {
        CheckData.checkTitleEmpty(postCreationRequest.getTitle());
        CheckData.checkContentEmpty(postCreationRequest.getContent());
        if (!userRepository.existsById(postCreationRequest.getUserId())) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        Post post = postMapper.toPost(postCreationRequest);
        LocalDateTime currentTime = LocalDateTime.now();

        post.setCreatedDate(currentTime);
        post.setTitleNoDiacritics(removeDiacritics(postCreationRequest.getTitle()));
        post = postRepository.save(post);

        return buildPostResponse(post);
    }

    @Override
    public PostResponse updatePost(PostUpdateRequest postUpdateRequest) {
        CheckData.checkTitleEmpty(postUpdateRequest.getTitle());
        CheckData.checkContentEmpty(postUpdateRequest.getContent());
        Post post = postRepository.findById(postUpdateRequest.getId())
                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));

        postMapper.updatePost(post, postUpdateRequest);
        post.setTitleNoDiacritics(removeDiacritics(postUpdateRequest.getTitle()));
        post = postRepository.save(post);

        return buildPostResponse(post);
    }

    @Override
    public void deletePostById(String id) {
        if (!postRepository.existsById(id)) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }

        commentRepository.deleteAllByPostId(id);
        reactRepository.deleteAllByPostId(id);

        postRepository.deleteById(id);
    }


    PostResponse buildPostResponse(Post post) {
        PostResponse postResponse = postMapper.toPostResponse(post);

        Optional<UserProfile> userProfile = userProfileRepository.findByUserId(post.getUserId());
        if (userProfile.isEmpty()) return null;
        userProfile.ifPresent(value -> {
            postResponse.setAuthor(value.getFirstName() + " " + value.getLastName());
            postResponse.setAuthorAvatar(value.getProfileImgUrl());
        });

        List<React> reacts = reactRepository.findAllByPostId(post.getId());
        Map<String, Integer> reactMap = new HashMap<>();
        for (React react : reacts) {
            String reactName = react.getName().toString();
            reactMap.put(reactName, reactMap.getOrDefault(reactName, 0) + 1);
        }
        postResponse.setReacts(reactMap);

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

