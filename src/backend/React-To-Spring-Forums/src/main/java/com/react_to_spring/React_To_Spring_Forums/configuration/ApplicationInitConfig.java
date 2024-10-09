package com.react_to_spring.React_To_Spring_Forums.configuration;

import com.react_to_spring.React_To_Spring_Forums.entity.Role;
import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.repository.RoleRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {

    UserRepository userRepository;
    RoleRepository roleRepository;

    PasswordEncoder passwordEncoder;

    @NonFinal
    @Value("${app.init-admin-account.username}")
    String ADMIN_USERNAME;

    @NonFinal
    @Value("${app.init-admin-account.password}")
    String ADMIN_PASSWORD;

    @NonFinal
    @Value("${app.role.admin.name}")
    String ADMIN_ROLE;

    @NonFinal
    @Value("${app.role.admin.description}")
    String ADMIN_DESCRIPTION;

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    public ApplicationRunner applicationRunner() {
        return args -> {
            if (!roleRepository.existsByName(ADMIN_ROLE)) {
                Role adminRole = Role.builder()
                        .name(ADMIN_ROLE)
                        .description(ADMIN_DESCRIPTION)
                        .build();

                User admin = User.builder()
                        .username(ADMIN_USERNAME)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .role(adminRole)
                        .build();

                roleRepository.save(adminRole);
                userRepository.save(admin);
            }
        };
    }
}
