package com.react_to_spring.React_To_Spring_Forums.entity;

import com.react_to_spring.React_To_Spring_Forums.enums.ReactName;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name = "reacts")
@Table(name = "reacts")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class React {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    String id;

    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    ReactName name;

    @Column(name = "user_id")
    String userId;

    @Column(name = "post_id")
    String postId;

    @Column(name = "created_date")
    LocalDateTime createdDate;
}
