package com.react_to_spring.React_To_Spring_Forums.repository;

import com.react_to_spring.React_To_Spring_Forums.entity.ReportViolatingPostRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReportViolatingPostRequestRepository extends MongoRepository<ReportViolatingPostRequest, String> {
    boolean existsBySendingUserIdAndPostId(String name, String postId);

    void deleteBySendingUserIdAndPostId(String name, String postId);

    ReportViolatingPostRequest findByPostId(String postId);

    void deleteAllByPostId(String postId);
}