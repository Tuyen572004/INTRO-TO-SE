package com.react_to_spring.React_To_Spring_Forums.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AfterBearerTokenExceptionHandler extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            ErrorCode errorCode = ErrorCode.UNAUTHORIZED;

            response.setStatus(errorCode.getStatus().value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

            ApiResponse<Void> apiResponse = ApiResponse.<Void>builder()
                    .code(errorCode.getCode())
                    .message(errorCode.getMessage())
                    .build();

            ObjectMapper objectMapper = new ObjectMapper();

            response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
            response.flushBuffer();
        }
    }
}
