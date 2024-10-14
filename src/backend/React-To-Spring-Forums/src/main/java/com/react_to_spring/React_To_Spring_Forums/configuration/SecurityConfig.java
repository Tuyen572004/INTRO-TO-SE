package com.react_to_spring.React_To_Spring_Forums.configuration;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityConfig {

    @NonFinal
    String[] PUBLIC_POST_ENDPOINTS = {
            "/users", "/auth", "/auth/introspect", "/auth/logout", "/auth/refresh", "/posts",
    };

    @NonFinal
    String[] PUBLIC_GET_ENDPOINTS = {
            "/v3/api-docs/**", "/swagger-ui/**", "/posts", "/user-profiles",
    };

    @NonFinal
    String[] PUBLIC_PUT_ENDPOINTS = {
            "/posts",
    };

    @NonFinal
    String[] PUBLIC_DELETE_ENDPOINTS = {
            "/posts/{id}",
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   AfterBearerTokenExceptionHandler exceptionHandler,
                                                   CustomJwtDecoder decoder) throws Exception {

        http.addFilterBefore(exceptionHandler, LogoutFilter.class);

        http.authorizeHttpRequests(configurer -> {
            configurer
                    .requestMatchers(HttpMethod.POST, PUBLIC_POST_ENDPOINTS)
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, PUBLIC_GET_ENDPOINTS)
                    .permitAll()
                    .requestMatchers(HttpMethod.PUT, PUBLIC_PUT_ENDPOINTS)
                    .permitAll()
                    .requestMatchers(HttpMethod.DELETE, PUBLIC_DELETE_ENDPOINTS)
                    .permitAll()
                    .anyRequest()
                    .authenticated();
        });

        http.csrf(AbstractHttpConfigurer::disable);

        http.oauth2ResourceServer(configurer -> configurer.jwt(jwtConfigurer -> jwtConfigurer
                        .decoder(decoder)
                        .jwtAuthenticationConverter(jwtAuthenticationConverter()))
                .authenticationEntryPoint(new JwtAuthenticationEntryPoint())
        );

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter(@Value("${client.url}") String clientUrl) {
        CorsConfiguration config = new CorsConfiguration();

        config.addAllowedOrigin(clientUrl);
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", config);

        return new CorsFilter(urlBasedCorsConfigurationSource);
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();
        converter.setAuthorityPrefix("");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(converter);

        return jwtAuthenticationConverter;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
