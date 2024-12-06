package com.react_to_spring.React_To_Spring_Forums.service.react;

import com.react_to_spring.React_To_Spring_Forums.dto.request.react.ReactCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.react.ReactUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ReactResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.React;
import com.react_to_spring.React_To_Spring_Forums.enums.ReactName;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.ReactMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.PostRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.ReactRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
import com.react_to_spring.React_To_Spring_Forums.service.notification.NotificationService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReactServiceImpl implements ReactService {
    UserRepository userRepository;
    PostRepository postRepository;
    ReactMapper reactMapper;
    ReactRepository reactRepository;

    NotificationService notificationService;

    @Override
    @Transactional
    public ReactResponse createReact(ReactCreationRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        if(!postRepository.existsById(request.getPostId())) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }
        if(reactRepository.existsByUserIdAndPostId(userId, request.getPostId())) {
            throw new AppException(ErrorCode.REACT_ALREADY_EXISTS);
        }

        React react = reactMapper.toReact(request);
        LocalDateTime currentTime = LocalDateTime.now();
        react.setCreatedDate(currentTime);
        react.setUserId(userId);

        react = reactRepository.save(react);

        notificationService.sendReactToPostCreationNotification(userId,react.getId(), react.getName().getName());
        return reactMapper.toReactResponse(react);
    }

    @Override
    public List<ReactResponse> getReactsByPostId(String postId) {
        if(!postRepository.existsById(postId)) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }
        List<React> reacts = reactRepository.findAllByPostId(postId);
        List<ReactResponse> reactResponses = new ArrayList<>();
        for(React react : reacts) {
            reactResponses.add(reactMapper.toReactResponse(react));
        }
        return reactResponses;
    }

    @Override
    public ReactResponse getReactByPostIdAndUserId(String postId, String userId) {
        if(!userRepository.existsById(userId)) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        if(!postRepository.existsById(postId)) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }
        Optional<React> react = reactRepository.findByPostIdAndUserId(postId, userId);

        return reactMapper.toReactResponse(react.get());
    }


    @Override
    @Transactional
    public ReactResponse updateReact(ReactUpdateRequest request) {
        React react = reactRepository.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.REACT_NOT_FOUND));
        reactMapper.updateReact(react, request);
        react = reactRepository.save(react);
        return reactMapper.toReactResponse(react);
    }

    @Override
    @Transactional
    public void deleteReactsByPostId(String postId) {
        if(!postRepository.existsById(postId)) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }
        reactRepository.deleteAllByPostId(postId);
    }

    @Override
    @Transactional
    public void deleteReactById(String id) {
        if(!reactRepository.existsById(id)) {
            throw new AppException(ErrorCode.REACT_NOT_FOUND);
        }
        reactRepository.deleteById(id);
    }
}
