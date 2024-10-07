package com.react_to_spring.React_To_Spring_Forums.service.role;

import com.react_to_spring.React_To_Spring_Forums.dto.request.role.RoleCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.role.RoleUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PermissionResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.RoleResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Permission;
import com.react_to_spring.React_To_Spring_Forums.entity.Role;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.PermissionMapper;
import com.react_to_spring.React_To_Spring_Forums.mapper.RoleMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.PermissionRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleServiceImp implements RoleService{

    RoleRepository roleRepository;
    PermissionRepository permissionRepository;

    RoleMapper roleMapper;
    PermissionMapper permissionMapper;

    @Override
    public RoleResponse createRole(RoleCreationRequest request) {
        Role role = roleMapper.toRole(request);
        List<Permission> permissions = permissionRepository.findAllById(request.getPermissions());
        role.setPermissions(permissions);

        RoleResponse roleResponse = roleMapper.toRoleResponse(roleRepository.save(role));
        roleResponse.setPermissions(buildPermissionResponses(role.getPermissions()));

        return  roleResponse;
    }

    @Override
    public RoleResponse updateRole(String name, RoleUpdateRequest request) {
        Role role = roleRepository.findById(name).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        roleMapper.updateRole(role, request);
        List<Permission> permissions = permissionRepository.findAllById(request.getPermissions());
        role.setPermissions(permissions);

        RoleResponse roleResponse = roleMapper.toRoleResponse(roleRepository.save(role));
        roleResponse.setPermissions(buildPermissionResponses(role.getPermissions()));

        return roleResponse;
    }

    @Override
    public RoleResponse addPermissions(String name, List<String> permissions) {

        Role role = roleRepository.findById(name).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        List<Permission> permissionList = permissionRepository.findAllById(permissions);

        Set<Permission> permissionSet = new HashSet<>(role.getPermissions());

        permissionSet.addAll(permissionList);
        role.setPermissions(new ArrayList<>(permissionSet));

        RoleResponse roleResponse = roleMapper.toRoleResponse(roleRepository.save(role));

        roleResponse.setPermissions(buildPermissionResponses(role.getPermissions()));
        return roleResponse;
    }

    @Override
    public List<RoleResponse> getAllRoles() {
        return roleRepository.findAll().stream().map(role -> {
            RoleResponse roleResponse = roleMapper.toRoleResponse(role);
            roleResponse.setPermissions(buildPermissionResponses(role.getPermissions()));
            return roleResponse;
        }).toList();
    }

    @Override
    public void deleteRole(String name) {
        Role role = roleRepository.findById(name).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));

        roleRepository.delete(role);
    }

    private List<PermissionResponse> buildPermissionResponses(List<Permission> permissions) {
        return permissions.stream().map(permissionMapper::toPermissionResponse).toList();
    }
}
