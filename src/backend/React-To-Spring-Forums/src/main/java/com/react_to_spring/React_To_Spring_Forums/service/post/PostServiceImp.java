package com.react_to_spring.React_To_Spring_Forums.service.post;

import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.post.PostUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PostResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Post;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.PostMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.CommentRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.PostRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserProfileRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImp implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<PostResponse> getAllPosts(String title) {
        List<Post> posts = postRepository.findAllByTitleContaining(title);
        if (posts.isEmpty()) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }

        List<PostResponse> postResponses = new ArrayList<>();
        for (Post item : posts) {
            PostResponse postResponse = postMapper.toPostResponse(item);

            Optional<UserProfile> userProfile = userProfileRepository.findByUserId(item.getUserId());
            if (userProfile.isEmpty()) continue;
            userProfile.ifPresent(value -> {
                postResponse.setAuthor(value.getFirstName() + " " + value.getLastName());
                postResponse.setAuthorAvatar(value.getProfileImgUrl());
            });

            /*
                Đoạn này còn phải lấy số lượng reacts liên quan đến bài post.
                Tạm thời cứ gán cứng react_counts là số lượng có sẵn bên db. Sau họp để thống nhất dữ liệu trả ra.
             */

            postResponses.add(postResponse);
        }

        return postResponses;
    }

    @Override
    public PostResponse createPost(PostCreationRequest postCreationRequest) {
        if (!userRepository.existsById(postCreationRequest.getUserId())) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        Post post = postMapper.toPost(postCreationRequest);
        Date currentTime = new Date();
        post.setCreatedDate(currentTime);

        post = postRepository.save(post);

        return postMapper.toPostResponse(post);
    }

    @Override
    public PostResponse updatePost(PostUpdateRequest postUpdateRequest) {
        Post post = postRepository.findById(postUpdateRequest.getId())
                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));

        postMapper.updatePost(post, postUpdateRequest);
        post = postRepository.save(post);

        return postMapper.toPostResponse(post);
    }

    @Override
    public void deletePostById(String id) {
        if (!postRepository.existsById(id)) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }

        commentRepository.deleteAllByPostId(id);
        /*
            Đoạn này phải xóa những react liên quan đến post này
         */
        postRepository.deleteById(id);
    }
}

