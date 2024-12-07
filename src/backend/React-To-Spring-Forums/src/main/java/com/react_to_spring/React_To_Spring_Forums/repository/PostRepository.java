package com.react_to_spring.React_To_Spring_Forums.repository;

import com.react_to_spring.React_To_Spring_Forums.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    boolean existsById(String id);

    Page<Post> getAllBy(Pageable pageable);

    @Query(value = "{ 'titleNoDiacritics' : { '$regex' : ?0, '$options' : 'i' } }")
    List<Post> findByTitleNoDiacriticsApproximate(String regex);

    @Query(value = "{ 'titleNoDiacritics' : { '$regex' : ?0, '$options' : 'i' } }")
    Page<Post> findByTitleNoDiacriticsApproximate(String title, Pageable pageable);

    List<Post> findByUserId(String userId);

    Page<Post> findAllByUserId(String userId, Pageable pageable);

    void deleteById(String id);
}
