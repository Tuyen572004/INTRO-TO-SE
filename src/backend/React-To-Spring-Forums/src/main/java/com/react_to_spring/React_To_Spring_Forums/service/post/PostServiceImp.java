package com.react_to_spring.React_To_Spring_Forums.service.post;

import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PostResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Post;
import com.react_to_spring.React_To_Spring_Forums.enums.NotificationTemplate;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.PostMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.*;
import com.react_to_spring.React_To_Spring_Forums.converter.PostConverter;
import com.react_to_spring.React_To_Spring_Forums.service.notification.NotificationService;
import com.react_to_spring.React_To_Spring_Forums.utils.StringUtil;
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

import java.time.LocalDateTime;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostServiceImp implements PostService {

    private PostRepository postRepository;
    private PostMapper postMapper;
    private UserRepository userRepository;
    private CommentRepository commentRepository;
    private ReactRepository reactRepository;

    private PostConverter postConverter;

    NotificationService notificationService;

    @Override
    public PostResponse getPostById(String id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));

        return postConverter.buildPostResponse(post);
    }

    @Override
    public PageResponse<PostResponse> getMyPosts(int page, int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Sort sort = Sort.by(Sort.Direction.DESC, "createdDate");
        String userId = authentication.getName();

        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<Post> posts = postRepository.findAllByUserId(userId, pageable);
        List<PostResponse> postResponses = postConverter.convertToPostResponses(posts.getContent());

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
        List<Post> posts = postRepository.findByTitleNoDiacriticsApproximate(postConverter.buildRegex(title));
        return postConverter.convertToPostResponses(posts);
    }

    @Override
    public PageResponse<PostResponse> getPostsByTitle(String title, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Post> posts = postRepository.findByTitleNoDiacriticsApproximate(postConverter.buildRegex(title), pageable);
        List<PostResponse> postResponses = postConverter.convertToPostResponses(posts.getContent());

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

        return postConverter.convertToPostResponses(posts);
    }

    @Override
    public PageResponse<PostResponse> getPostsByUserId(String userId, int page, int size) {
        if (!userRepository.existsById(userId)) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Post> posts = postRepository.findAllByUserId(userId, pageable);
        List<PostResponse> postResponses = postConverter.convertToPostResponses(posts.getContent());

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
        if (StringUtil.isEmpty(postCreationRequest.getTitle())) {
            throw new AppException(ErrorCode.TITLE_IS_EMPTY);
        }
        if (StringUtil.isEmpty(postCreationRequest.getContent())) {
            throw new AppException(ErrorCode.CONTENT_IS_EMPTY);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        if (!userRepository.existsById(userId)) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        Post post = postMapper.toPost(postCreationRequest);
        LocalDateTime currentTime = LocalDateTime.now();
        post.setCreatedDate(currentTime);
        post.setTitleNoDiacritics(postConverter.removeDiacritics(postCreationRequest.getTitle()));
        post.setUserId(userId);

        post = postRepository.save(post);

        notificationService.sendPostCreationNotification(userId,post.getId());

        return postConverter.buildPostResponse(post);
    }

    @Override
    public PostResponse updatePost(PostUpdateRequest postUpdateRequest) {
        if (StringUtil.isEmpty(postUpdateRequest.getTitle())) {
            throw new AppException(ErrorCode.TITLE_IS_EMPTY);
        }
        if (StringUtil.isEmpty(postUpdateRequest.getContent())) {
            throw new AppException(ErrorCode.CONTENT_IS_EMPTY);
        }

        Post post = postRepository.findById(postUpdateRequest.getId())
                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        if (!post.getUserId().equals(userId)) {
            throw new AppException(ErrorCode.USER_NOT_POST_OWNER);
        }

        postMapper.updatePost(post, postUpdateRequest);
        post.setTitleNoDiacritics(postConverter.removeDiacritics(postUpdateRequest.getTitle()));
        post = postRepository.save(post);

        return postConverter.buildPostResponse(post);
    }

    @Override
    public void deletePostById(String id) {
        if (!postRepository.existsById(id)) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }

        commentRepository.deleteAllByPostId(id);
        reactRepository.deleteAllByPostId(id);

        postRepository.deleteById(id);

        // sendNotification to owner of post if post is deleted by admin
    }
}

