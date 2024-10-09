package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.permission.PermissionCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.permission.PermissionUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PermissionResponse;
import com.react_to_spring.React_To_Spring_Forums.service.permission.PermissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permissions")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Permission Controller", description = "APIs for managing permissions")
public class PermissionController {

    PermissionService permissionService;

    @NonFinal
    @Value("${app.controller.permission.response.delete.success}")
    String DELETE_SUCCESS_MESSAGE;

    @PostMapping
    @Operation(summary = "Create a new permission",
            description = "Create a new permission with the given name and description")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<PermissionResponse> createPermission(@RequestBody PermissionCreationRequest request) {
        return ApiResponse.<PermissionResponse>builder()
                .data(permissionService.createPermission(request))
                .build();
    }

    @GetMapping
    @Operation(summary = "Get all permissions",
            description = "Get all permissions in the system")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<PermissionResponse>> getAllPermissions() {
        return ApiResponse.<List<PermissionResponse>>builder()
                .data(permissionService.getAllPermissions())
                .build();
    }

    @PatchMapping
    @Operation(summary = "Update permission by providing name",
            description = "Update permission whose name is \"name\"")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<PermissionResponse> updatePermission(@RequestParam("name") String name,
                                                            @RequestBody PermissionUpdateRequest request) {
        return ApiResponse.<PermissionResponse>builder()
                .data(permissionService.updatePermission(name, request))
                .build();
    }

    @DeleteMapping
    @Operation(summary = "Delete permission",
            description = "Delete permission whose name is \"name\"")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> deletePermission(@RequestParam("name") String name) {
        permissionService.deletePermission(name);
        return ApiResponse.<Void>builder()
                .message(DELETE_SUCCESS_MESSAGE)
                .build();
    }

}
