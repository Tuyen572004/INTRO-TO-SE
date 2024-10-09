package com.react_to_spring.React_To_Spring_Forums.service.permission;

import com.react_to_spring.React_To_Spring_Forums.dto.request.permission.PermissionCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.permission.PermissionUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PermissionResponse;

import java.util.List;

public interface PermissionService {
    PermissionResponse createPermission(PermissionCreationRequest request);

    List<PermissionResponse> getAllPermissions();

    PermissionResponse updatePermission(String name, PermissionUpdateRequest request);

    void deletePermission(String name);
}
