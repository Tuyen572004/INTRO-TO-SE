package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.react.ReactCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.react.ReactUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ReactResponse;
import com.react_to_spring.React_To_Spring_Forums.service.react.ReactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reacts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "React Controller", description = "APIs for managing reacts")
public class ReactController {
    ReactService reactService;

    @NonFinal
    @Value("React deleted successfully") // can't use the value from the properties file because
                                        // the properties file is in gitignore
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
    public ApiResponse<List<ReactResponse>> getReactsByPostId(@RequestParam("postId") String postId) {
        return ApiResponse.<List<ReactResponse>>builder()
                .data(reactService.getReactsByPostId(postId))
                .build();
    }

    @GetMapping
    @Operation(summary = "Get a react by user ID and post ID",
            description = "Get a react by providing the user ID and the post ID")
    public ApiResponse<ReactResponse> getUserById(@RequestParam("postId") String postId ,@RequestParam("userId") String userId) {
        return ApiResponse.<ReactResponse>builder()
                .data(reactService.getReactByPostIdAndUserId(postId, userId))
                .build();
    }


    @DeleteMapping()
    @Operation(summary = "Delete a react",
            description = "Delete a react by providing the react ID")
    public ApiResponse<Void> deleteReact(@RequestParam("id") String id) {
        reactService.deleteReactById(id);
        return ApiResponse.<Void>builder()
                .message(DELETE_SUCCESS)
                .build();
    }

    @DeleteMapping("/all")
    @Operation(summary = "Delete all reacts by post ID",
            description = "Delete all reacts by providing post ID")
    public ApiResponse<Void> deleteReactsByPostId(@RequestParam("postId") String postId) {
        reactService.deleteReactsByPostId(postId);
        return ApiResponse.<Void>builder()
                .message(DELETE_SUCCESS)
                .build();
    }

    @PutMapping
    @Operation(summary = "Update react",
            description = "Update react by providing react ID and new information: type")
    public ApiResponse<ReactResponse> updateReact(@RequestBody ReactUpdateRequest request) {
        return ApiResponse.<ReactResponse>builder()
                .data(reactService.updateReact(request))
                .build();
    }


}
