package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ReactResponse;
import com.react_to_spring.React_To_Spring_Forums.service.react.ReactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


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
            description = "Create a new react with postId")
    public ApiResponse<ReactResponse> createReact(@RequestParam("postId") @NotNull String postId) {
        return ApiResponse.<ReactResponse>builder()
                .data(reactService.createReact(postId))
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
}
