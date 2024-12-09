package com.react_to_spring.React_To_Spring_Forums.repository;

import com.react_to_spring.React_To_Spring_Forums.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsById(String id);

    boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);

    Optional<User> findById(String id);

    Optional<User> findByEmail(String email);
}
