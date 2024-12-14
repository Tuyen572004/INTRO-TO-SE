package com.react_to_spring.React_To_Spring_Forums.service.addfriendrequest;

import com.react_to_spring.React_To_Spring_Forums.dto.request.addfriend.ResponseAddFriendRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.AddFriendRequestResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;

public interface AddFriendRequestService {
    void sendAddFriendRequest(String friendId);

    void responseAddFriendRequest(ResponseAddFriendRequest request);

    PageResponse<AddFriendRequestResponse> getAllOfMyAddFriendRequests(int page, int size);

    void unfriend(String friendId);
    void unsendAddFriendRequest(String friendId);

    boolean isFriend(String friendId);

    boolean isAddFriendRequestSent(String friendId);
}
