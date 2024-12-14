package com.react_to_spring.React_To_Spring_Forums.repository;

import com.react_to_spring.React_To_Spring_Forums.entity.NotificationRecipient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRecipientRepository extends MongoRepository<NotificationRecipient, String> {

    NotificationRecipient findByNotificationIdAndRecipientId(String notificationId, String userId);

    Page<NotificationRecipient> findAllByRecipientId(String userId, Pageable pageable);
}
