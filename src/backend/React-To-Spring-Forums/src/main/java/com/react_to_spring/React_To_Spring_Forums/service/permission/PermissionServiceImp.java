package com.react_to_spring.React_To_Spring_Forums.service.permission;

import com.react_to_spring.React_To_Spring_Forums.dto.request.permission.PermissionCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.permission.PermissionUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PermissionResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.Permission;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.mapper.PermissionMapper;
import com.react_to_spring.React_To_Spring_Forums.repository.PermissionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionServiceImp implements PermissionService {

    PermissionRepository permissionRepository;

    PermissionMapper permissionMapper;

    @Override
    public PermissionResponse createPermission(PermissionCreationRequest request) {
        if (permissionRepository.existsById(request.getName())) {
            throw new AppException(ErrorCode.PERMISSION_EXISTED);
        }

        Permission permission = permissionMapper.toPermission(request);
        return permissionMapper.toPermissionResponse(permissionRepository.save(permission));
    }

    @Override
    public List<PermissionResponse> getAllPermissions() {
        return permissionRepository.findAll().stream().map(permissionMapper::toPermissionResponse)
                .toList();
    }

    @Override
    public PermissionResponse updatePermission(String name, PermissionUpdateRequest request) {
        Permission permission = permissionRepository.findById(name).orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_FOUND));

        permissionMapper.updatePermission(permission, request);

        return permissionMapper.toPermissionResponse(permissionRepository.save(permission));
    }

    @Override
    public void deletePermission(String name) {
        Permission permission = permissionRepository.findById(name).orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_FOUND));

        permissionRepository.delete(permission);
    }
}
