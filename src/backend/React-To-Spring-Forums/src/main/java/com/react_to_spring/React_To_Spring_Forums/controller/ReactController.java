package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.react.ReactCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.react.ReactUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ReactResponse;
import com.react_to_spring.React_To_Spring_Forums.service.react.ReactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reacts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "React Controller", description = "APIs for managing reacts")
@Validated
public class ReactController {
    ReactService reactService;

    @NonFinal
    @Value("${app.controller.react.response.delete.success}")
    String DELETE_SUCCESS;

    @PostMapping
    @Operation(summary = "Create a new react",
            description = "Create a new react with the provided details")
    public ApiResponse<ReactResponse> createReact(@Valid @RequestBody ReactCreationRequest request) {
        return ApiResponse.<ReactResponse>builder()
                .data(reactService.createReact(request))
                .build();
    }

    @GetMapping("/all")
    @Operation(summary = "Get all reacts by post ID",
            description = "Get all reacts by providing post ID")
    public ApiResponse<List<ReactResponse>> getReactsByPostId(@RequestParam("postId") @NotNull String postId) {
        return ApiResponse.<List<ReactResponse>>builder()
                .data(reactService.getReactsByPostId(postId))
                .build();
    }

    @GetMapping
    @Operation(summary = "Get a react by user ID and post ID",
            description = "Get a react by providing the user ID and the post ID")
    public ApiResponse<ReactResponse> getUserById(@RequestParam("postId") @NotNull(message = "REQUIRED_POST_ID") String postId ,@RequestParam("userId") @NotNull String userId) {
        return ApiResponse.<ReactResponse>builder()
                .data(reactService.getReactByPostIdAndUserId(postId, userId))
                .build();
    }


    @DeleteMapping()
    @Operation(summary = "Delete a react",
            description = "Delete a react by providing the react ID")
    public ApiResponse<Void> deleteReact(@RequestParam("reactId") @NotNull String reactId) {
        reactService.deleteReactById(reactId);
        return ApiResponse.<Void>builder()
                .message(DELETE_SUCCESS)
                .build();
    }

    @DeleteMapping("/all")
    @Operation(summary = "Delete all reacts by post ID",
            description = "Delete all reacts by providing post ID")
    public ApiResponse<Void> deleteReactsByPostId(@RequestParam("postId") @NotNull String postId) {
        reactService.deleteReactsByPostId(postId);
        return ApiResponse.<Void>builder()
                .message(DELETE_SUCCESS)
                .build();
    }

    @PutMapping
    @Operation(summary = "Update react",
            description = "Update react by providing react ID and new information: type")
    public ApiResponse<ReactResponse> updateReact(@Valid @RequestBody ReactUpdateRequest request) {
        return ApiResponse.<ReactResponse>builder()
                .data(reactService.updateReact(request))
                .build();
    }


}
