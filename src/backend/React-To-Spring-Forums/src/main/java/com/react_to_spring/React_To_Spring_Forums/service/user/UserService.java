package com.react_to_spring.React_To_Spring_Forums.service.user;

import com.react_to_spring.React_To_Spring_Forums.dto.request.user.UserCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.SearchUserResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserCreationRequest request);

    UserResponse getUserById(String id);

    UserResponse getMyAccount();

    List<SearchUserResponse> searchUserbyUsernameContaining(String text);

    PageResponse<UserResponse> getUsers(int page, int size);

    List<UserResponse> getAllUsers();

    void deleteUser(String id);
}
