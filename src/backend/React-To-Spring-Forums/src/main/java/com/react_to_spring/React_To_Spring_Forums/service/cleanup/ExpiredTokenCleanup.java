package com.react_to_spring.React_To_Spring_Forums.service.cleanup;

import com.react_to_spring.React_To_Spring_Forums.repository.InvalidatedTokenRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ExpiredTokenCleanup {

    InvalidatedTokenRepository invalidatedTokenRepository;

    @Scheduled(fixedDelay = 86400000) // ms
    @Transactional
    public void cleanupExpiredTokens() {
        invalidatedTokenRepository.deleteAllByExpirationTimeBefore(LocalDateTime.now());
    }
}
