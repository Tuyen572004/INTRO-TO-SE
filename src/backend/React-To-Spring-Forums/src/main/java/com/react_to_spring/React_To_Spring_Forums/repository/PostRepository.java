package com.react_to_spring.React_To_Spring_Forums.repository;

import com.react_to_spring.React_To_Spring_Forums.entity.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    boolean existsById(String id);

    Optional<Post> findById(String id);

    @Query(value = "{ 'title' : { '$regex' : ?0, '$options' : 'i' } }")
    List<Post> findAllByTitleContaining(String title);

    void deleteById(String id);
}
