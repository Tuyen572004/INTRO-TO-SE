package com.react_to_spring.React_To_Spring_Forums.repository;

import com.react_to_spring.React_To_Spring_Forums.entity.React;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReactRepository extends JpaRepository<React, String> {
    List<React> findAllByPostId(String postId);
    Optional<React> findByPostIdAndUserId(String postId, String userId);
    void deleteAllByPostId(String postId);

}
