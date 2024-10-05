package com.react_to_spring.React_To_Spring_Forums.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity(name = "invalidated_tokens")
@Table(name = "invalidated_tokens")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InvalidatedToken {
    @Id
    @Column(name = "access_id")
    String accessId;

    @Column(name = "refresh_id")
    String refreshId;

    @Column(name = "expiration_time")
    LocalDateTime expirationTime;
}
