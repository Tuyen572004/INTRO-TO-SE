package com.react_to_spring.React_To_Spring_Forums.repository;

import com.react_to_spring.React_To_Spring_Forums.entity.VerifyCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerifyCodeRepository extends JpaRepository<VerifyCode, String> {
    boolean existsByUserId(String userId);

    Optional<VerifyCode> findByUserIdAndVerifyCode(String userId, String verifyCode);


//    Optional<VerifyCode> findByUser_id(String userId);
}
