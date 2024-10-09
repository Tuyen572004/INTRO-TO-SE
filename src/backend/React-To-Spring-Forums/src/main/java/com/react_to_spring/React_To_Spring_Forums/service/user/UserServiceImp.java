package com.react_to_spring.React_To_Spring_Forums.service.user;

import com.react_to_spring.React_To_Spring_Forums.dto.request.user.UserCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.userprofile.UserProfileCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Role;
import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.RoleMapper;
import com.react_to_spring.React_To_Spring_Forums.mapper.UserMapper;
import com.react_to_spring.React_To_Spring_Forums.mapper.UserProfilerMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.RoleRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
import com.react_to_spring.React_To_Spring_Forums.service.userprofile.UserProfileService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImp implements UserService{

    UserRepository userRepository;
    RoleRepository roleRepository;

    UserProfileService userProfileService;

    UserMapper userMapper;
    RoleMapper roleMapper;
    UserProfilerMapper userProfilerMapper;

    PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserResponse createUser(UserCreationRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        Role role = roleRepository.findById(request.getRole())
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));

        User user = userMapper.toUser(request);
        user.setRole(role);
        user.setUsername(passwordEncoder.encode(user.getPassword()));

        user = userRepository.save(user);

        UserProfileCreationRequest userProfileCreationRequest = userProfilerMapper.toUserProfileCreationRequest(request);
        userProfileCreationRequest.setUserId(user.getId());

        userProfileService.createUserProfile(userProfileCreationRequest);

        // DEBT: 2021-07-21
        // Send verification email
        return buildUserResponse(user);
    }

    @Override
    public UserResponse getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return buildUserResponse(user);
    }

    @Override
    @PostAuthorize("returnObject.id == authentication.name")
    public UserResponse getMyAccount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return buildUserResponse(user);
    }

    // page starts from 1
    @Override
    public PageResponse<UserResponse> getUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);

        Page<User> users = userRepository.findAll(pageable);
        List<UserResponse> responses = buildUserResponses(users.getContent());

        return PageResponse.<UserResponse>builder()
                .page(page)
                .size(size)
                .totalElements(users.getTotalElements())
                .totalPages(users.getTotalPages())
                .data(responses)
                .build();
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return buildUserResponses(userRepository.findAll());
    }

    @Override
    @Transactional
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        userProfileService.deleteUserProfileByUserId(id);
        userRepository.deleteById(id);
    }

    private UserResponse buildUserResponse(User user) {
        UserResponse userResponse = userMapper.toUserResponse(user);
        userResponse.setRole(roleMapper.toRoleResponse(user.getRole()));

        return userResponse;
    }

    private List<UserResponse> buildUserResponses(List<User> users) {
        return users.stream().map(user -> {
            UserResponse userResponse = userMapper.toUserResponse(user);
            userResponse.setRole(roleMapper.toRoleResponse(user.getRole()));

            return userResponse;
        }).toList();
    }
}
