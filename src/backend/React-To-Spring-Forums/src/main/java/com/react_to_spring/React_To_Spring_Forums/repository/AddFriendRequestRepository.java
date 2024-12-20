package com.react_to_spring.React_To_Spring_Forums.repository;

import com.react_to_spring.React_To_Spring_Forums.entity.AddFriendRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AddFriendRequestRepository extends MongoRepository<AddFriendRequest, String> {
    void deleteBySendingUserIdAndReceivingUserId(String sendingUserId, String receivingUserId);

    Page<AddFriendRequest> findAllByReceivingUserId(String receivingUserId, Pageable pageable);

    Page<AddFriendRequest> findAllBySendingUserId(String sendingUserId, Pageable pageable);

    boolean existsBySendingUserIdAndReceivingUserId(String userId, String friendId);
}