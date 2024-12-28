package com.react_to_spring.React_To_Spring_Forums.service.user;

import com.react_to_spring.React_To_Spring_Forums.dto.request.user.UserCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.userprofile.UserProfileCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.verifycode.SendVerificationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.SearchUserResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Role;
import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.RoleMapper;
import com.react_to_spring.React_To_Spring_Forums.mapper.UserMapper;
import com.react_to_spring.React_To_Spring_Forums.mapper.UserProfilerMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.RoleRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserProfileRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
import com.react_to_spring.React_To_Spring_Forums.service.userprofile.UserProfileService;
import com.react_to_spring.React_To_Spring_Forums.service.verifycode.VerifyCodeService;
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

import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImp implements UserService{

    UserRepository userRepository;
    UserProfileRepository userProfileRepository;
    RoleRepository roleRepository;

    UserProfileService userProfileService;

    UserMapper userMapper;
    RoleMapper roleMapper;
    UserProfilerMapper userProfilerMapper;

    PasswordEncoder passwordEncoder;

    VerifyCodeService verifyCodeService;


    @Override
    @Transactional
    public UserResponse createUser(UserCreationRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        User user = userMapper.toUser(request);

        Role role;
        if (request.getRole() != null) {
            role = roleRepository.findById(request.getRole())
                    .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        } else {
            role = roleRepository.findById("USER")
                    .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        }
        user.setRole(role);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        verifyCodeService.sendVerifyLink(SendVerificationRequest.builder()
                                                                .email(user.getEmail())
                                                                .build());

        UserProfileCreationRequest userProfileCreationRequest = userProfilerMapper.toUserProfileCreationRequest(request);
        userProfileCreationRequest.setUserId(user.getId());

        userProfileService.createUserProfile(userProfileCreationRequest);


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
        String userId = authentication.getName();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return buildUserResponse(user);
    }

    @Override
    public List<SearchUserResponse> searchUserbyUsernameContaining(String text) {
        List<User> users = userRepository.findByUsernameContaining(text);

        List<SearchUserResponse> responses = new ArrayList<>();

        for (User user : users) {
            UserProfile userProfile = userProfileRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND));

            SearchUserResponse searchUserResponse = SearchUserResponse.builder()
                    .user(userMapper.toUserResponse(user))
                    .userProfile(userProfilerMapper.toUserProfileResponse(userProfile))
                    .build();

            responses.add(searchUserResponse);
        }

        return responses;
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

    @Override
    public Long getUserCount() {
        return userRepository.count();
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
