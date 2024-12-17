package com.react_to_spring.React_To_Spring_Forums.repository;

import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserProfileRepository extends MongoRepository<UserProfile, String> {
    boolean existsByUserId(String userId);

    Optional<UserProfile> findByUserId(String userId);

    void deleteUserProfileByUserId(String userId);

    Page<UserProfile> findAllByUserIdIn(List<String> friendIds, Pageable pageable);

    List<UserProfile> findAllByUserIdIn(List<String> userIds);

}
