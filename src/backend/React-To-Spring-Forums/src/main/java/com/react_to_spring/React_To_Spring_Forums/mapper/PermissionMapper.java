package com.react_to_spring.React_To_Spring_Forums.mapper;

import com.react_to_spring.React_To_Spring_Forums.dto.request.permission.PermissionCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.permission.PermissionUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PermissionResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Permission;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PermissionMapper {
    Permission toPermission(PermissionCreationRequest request);

    void updatePermission(@MappingTarget Permission permission, PermissionUpdateRequest request);

    PermissionResponse toPermissionResponse(Permission permission);
}
