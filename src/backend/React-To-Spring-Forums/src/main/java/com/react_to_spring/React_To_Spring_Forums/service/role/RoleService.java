package com.react_to_spring.React_To_Spring_Forums.service.role;

import com.react_to_spring.React_To_Spring_Forums.dto.request.role.RoleCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.role.RoleUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.RoleResponse;

import java.util.List;

public interface RoleService {
    RoleResponse createRole(RoleCreationRequest request);

    RoleResponse updateRole(String name, RoleUpdateRequest request);

    RoleResponse addPermissions(String name, List<String> permissions);

    List<RoleResponse> getAllRoles();

    void deleteRole(String name);
}
