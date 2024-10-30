package com.react_to_spring.React_To_Spring_Forums.repository;

import com.react_to_spring.React_To_Spring_Forums.entity.React;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReactRepository extends MongoRepository<React, String> {
    @Query(value = "{ 'postId' : ?0 }")
    List<React> findAllByPostId(String postId);

    @Query(value = "{ 'postId' : ?0, 'userId' : ?1 }")
    Optional<React> findByPostIdAndUserId(String postId, String userId);

    @Query(value = "{ 'postId' : ?0 }", delete = true)
    void deleteAllByPostId(String postId);

    boolean existsByUserIdAndPostId(String userId, String postId);
}
