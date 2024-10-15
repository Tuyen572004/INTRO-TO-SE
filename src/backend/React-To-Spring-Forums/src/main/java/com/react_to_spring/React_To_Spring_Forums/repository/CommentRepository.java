package com.react_to_spring.React_To_Spring_Forums.repository;

import com.react_to_spring.React_To_Spring_Forums.dto.response.CommentResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findAllByPostId(String postId);

    Optional<Comment> findById(String id);

    void deleteById(String id);

    void deleteAllByPostId(String postId);
}
