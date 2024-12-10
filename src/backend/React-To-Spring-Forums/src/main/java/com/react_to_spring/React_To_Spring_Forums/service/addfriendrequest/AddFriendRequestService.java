package com.react_to_spring.React_To_Spring_Forums.service.addfriendrequest;

import com.react_to_spring.React_To_Spring_Forums.dto.request.addfriend.ResponseAddFriendRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.AddFriendRequestResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;

public interface AddFriendRequestService {
    void sendAddFriendRequest(String friendId);

    void responseAddFriendRequest(ResponseAddFriendRequest request);

    PageResponse<AddFriendRequestResponse> getAllAddFriendRequestsByUserId(String userId, int page, int size);

    void unfriend(String friendId);
}
