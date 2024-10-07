package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.permission.PermissionCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.permission.PermissionUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PermissionResponse;
import com.react_to_spring.React_To_Spring_Forums.service.permission.PermissionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permissions")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionController {

    PermissionService permissionService;

    @NonFinal
    @Value("${app.controller.permission.response.delete.success}")
    String DELETE_SUCCESS_MESSAGE;

    @PostMapping
    public ApiResponse<PermissionResponse> createPermission(@RequestBody PermissionCreationRequest request) {
        return ApiResponse.<PermissionResponse>builder()
                .data(permissionService.createPermission(request))
                .build();
    }

    @GetMapping
    public ApiResponse<List<PermissionResponse>> getAllPermissions() {
        return ApiResponse.<List<PermissionResponse>>builder()
                .data(permissionService.getAllPermissions())
                .build();
    }

    @PatchMapping
    public ApiResponse<PermissionResponse> updatePermission(@RequestParam("name") String name,
                                                            @RequestBody PermissionUpdateRequest request) {
        return ApiResponse.<PermissionResponse>builder()
                .data(permissionService.updatePermission(name, request))
                .build();
    }

    @DeleteMapping
    public ApiResponse<Void> deletePermission(@RequestParam("name") String name) {
        permissionService.deletePermission(name);
        return ApiResponse.<Void>builder()
                .message(DELETE_SUCCESS_MESSAGE)
                .build();
    }

}
