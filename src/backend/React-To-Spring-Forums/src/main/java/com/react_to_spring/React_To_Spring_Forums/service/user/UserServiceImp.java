package com.react_to_spring.React_To_Spring_Forums.service.user;

import com.react_to_spring.React_To_Spring_Forums.dto.request.user.UserCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Role;
import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.UserMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.RoleRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImp implements UserService{

    UserRepository userRepository;
    RoleRepository roleRepository;

    UserMapper userMapper;

    @Override
    public UserResponse createUser(UserCreationRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        Role role = roleRepository.findById(request.getRole())
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));

        User user = userMapper.toUser(request);
        user.setRole(role);

        return userMapper.toUserResponse(userRepository.saveAndFlush(user));
    }

    @Override
    public UserResponse getUserById(String id) {
        return userMapper.toUserResponse(userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));
    }

    // page starts from 1
    @Override
    public PageResponse<UserResponse> getUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);

        Page<User> users = userRepository.findAll(pageable);
        List<UserResponse> responses = users.map(userMapper::toUserResponse).getContent();

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
        return userRepository.findAll().stream().map(userMapper::toUserResponse).collect(Collectors.toList());
    }
}
