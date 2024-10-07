package com.react_to_spring.React_To_Spring_Forums.mapper;

import com.react_to_spring.React_To_Spring_Forums.dto.request.role.RoleCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.role.RoleUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.RoleResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleCreationRequest request);

    @Mapping(target = "permissions", ignore = true)
    void updateRole(@MappingTarget Role role, RoleUpdateRequest request);

    @Mapping(target = "permissions", ignore = true)
    RoleResponse toRoleResponse(Role role);
}
