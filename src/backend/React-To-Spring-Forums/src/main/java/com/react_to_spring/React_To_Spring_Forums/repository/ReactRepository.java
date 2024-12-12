package com.react_to_spring.React_To_Spring_Forums.repository;

import com.react_to_spring.React_To_Spring_Forums.entity.React;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ReactRepository extends MongoRepository<React, String> {
    Integer countByPostId(String postId);

    @Query(value = "{ 'postId' : ?0 }", delete = true)
    void deleteAllByPostId(String postId);

    boolean existsByUserIdAndPostId(String userId, String postId);

    void deleteByPostIdAndUserId(String postId, String userId);
}
