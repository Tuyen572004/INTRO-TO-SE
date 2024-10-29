package com.react_to_spring.React_To_Spring_Forums.repository;

import com.react_to_spring.React_To_Spring_Forums.entity.Comment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    boolean existsById(String id);

    List<Comment> findAllByPostId(String postId);

    // @Query(value = "{ 'postId' : ?0 }")
    Page<Comment> findAllByPostId(String postId, Pageable pageable);

    Optional<Comment> findById(String id);

    void deleteById(String id);

    void deleteAllByPostId(String postId);
}
