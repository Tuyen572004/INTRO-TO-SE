package com.react_to_spring.React_To_Spring_Forums.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity(name = "verify_codes")
@Table(name = "verify_codes")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VerifyCode {

    @Id
    String verifyCode;

    @Column(name = "expiration_time")
    LocalDateTime expirationTime;

    @OneToOne(fetch = FetchType.LAZY, cascade = {
            CascadeType.MERGE, CascadeType.PERSIST,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    @JoinColumn(name = "user_id")
    User user;


}
