package com.react_to_spring.React_To_Spring_Forums.exception;

import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final String MIN_ATTRIBUTE = "min";

    // Mapping of parameter names to custom messages
    private static final Map<String, String> PARAMETER_MESSAGES = new HashMap<>() {{
        put("postId", "REQUIRED_POST_ID");
        put("userId", "REQUIRED_USER_ID");
        put("reactId", "REQUIRED_REACT_ID");
        put("commentId", "REQUIRED_COMMENT_ID");
    }};

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleUncategorizedException(Exception exception) {
        ErrorCode errorCode = ErrorCode.UNCATEGORIZED_EXCEPTION;
        return ResponseEntity.status(errorCode.getStatus())
                .body(ApiResponse.<Void>builder()
                        .code(errorCode.getCode())
                        .message(exception.getMessage())
                        .build());
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<Void>> handleAppException(AppException exception) {
        return ResponseEntity.status(exception.getErrorCode().getStatus())
                .body(ApiResponse.<Void>builder()
                        .code(exception.getErrorCode().getCode())
                        .message(exception.getMessage())
                        .build());
    }

    @ExceptionHandler(NotVerifiedException.class)
    public ResponseEntity<ApiResponse<String>> handleNotVerifiedException(NotVerifiedException e) {
        return ResponseEntity.status(e.getErrorCode().getStatus())
                .body(ApiResponse.<String>builder()
                        .code(e.getErrorCode().getCode())
                        .message(e.getMessage())
                        .data(e.getEmail())
                        .build());
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<Void>> handleConstraintViolationException(ConstraintViolationException exception) {
        ErrorCode errorCode = ErrorCode.INVALID_KEY;
        try {
            ConstraintViolation<?> constraintViolation = exception.getConstraintViolations().stream().findFirst().get();
            errorCode = ErrorCode.valueOf(constraintViolation.getMessage());
        } catch (IllegalArgumentException ignored) {
        }

        ApiResponse<Void> apiResponse = new ApiResponse<>();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ApiResponse<Void>> handleMissingServletRequestParameter(
            MissingServletRequestParameterException exception) {
        ErrorCode errorCode= ErrorCode.valueOf(PARAMETER_MESSAGES.getOrDefault(exception.getParameterName(), "INVALID_KEY"));

        ApiResponse<Void> apiResponse = new ApiResponse<>();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<Void>> handleAccessDeniedException() {
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
        return ResponseEntity.status(errorCode.getStatus())
                .body(ApiResponse.<Void>builder()
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }



    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        ErrorCode errorCode = ErrorCode.INVALID_KEY;
        Map<String, Object> attributes = null;

        try {
            String errorMsg = exception.getFieldError().getDefaultMessage();
            errorCode = ErrorCode.valueOf(errorMsg);

            ConstraintViolation constraintViolation =
                    exception.getAllErrors().stream().findFirst().get().unwrap(ConstraintViolation.class);

            attributes = constraintViolation.getConstraintDescriptor().getAttributes();
        } catch (IllegalArgumentException ignored) {
        }

        ApiResponse<Void> apiResponse = new ApiResponse<>();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(
                Objects.isNull(attributes) ? errorCode.getMessage() : mapAttribute(errorCode.getMessage(), attributes));

        return ResponseEntity.badRequest().body(apiResponse);
    }

    private String mapAttribute(String message, Map<String, Object> attributes) {
        String minValue = String.valueOf(attributes.get(MIN_ATTRIBUTE));

        return message.replace("{}", minValue);
    }

}
