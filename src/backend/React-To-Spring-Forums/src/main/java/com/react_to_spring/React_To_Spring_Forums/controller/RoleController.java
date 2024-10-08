package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.role.RoleCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.role.RoleUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.RoleResponse;
import com.react_to_spring.React_To_Spring_Forums.service.role.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Role Controller", description = "APIs for managing roles")
public class RoleController {

    RoleService roleService;

    @NonFinal
    @Value("${app.controller.role.response.delete.success}")
    String DELETE_SUCCESS_MESSAGE;

    @PostMapping
    @Operation(summary = "Create a new role",
            description = "Create a new role with the provided details: name, description, permissions")
    public ApiResponse<RoleResponse> createRole(@RequestBody RoleCreationRequest request) {
        return ApiResponse.<RoleResponse>builder()
                .data(roleService.createRole(request))
                .build();
    }

    @GetMapping
    @Operation(summary = "Get all roles",
            description = "Get all roles in the systems")
    public ApiResponse<List<RoleResponse>> getAllRoles() {
        return ApiResponse.<List<RoleResponse>>builder()
                .data(roleService.getAllRoles())
                .build();
    }

    @PutMapping
    @Operation(summary = "Update role by providing name",
            description = "Update role by providing name")
    public ApiResponse<RoleResponse> updateRole(@RequestParam("name") String name, @RequestBody RoleUpdateRequest request) {
        return ApiResponse.<RoleResponse>builder()
                .data(roleService.updateRole(name, request))
                .build();
    }

    @PatchMapping
    @Operation(summary = "Add new permissions to role",
            description = "Add provided permissions to role whose name is \"name\"")
    public ApiResponse<RoleResponse> addPermissions(@RequestParam("name") String name, @RequestBody List<String> permissions) {
        return ApiResponse.<RoleResponse>builder()
                .data(roleService.addPermissions(name, permissions))
                .build();
    }

    @DeleteMapping
    @Operation(summary = "Delete role",
            description = "Delete role whose name is \"name\"")
    public ApiResponse<Void> deleteRole(@RequestParam("name") String name) {
        roleService.deleteRole(name);
        return ApiResponse.<Void>builder()
                .message(DELETE_SUCCESS_MESSAGE)
                .build();
    }
}
