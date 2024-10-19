package com.react_to_spring.React_To_Spring_Forums.mapper;

import com.react_to_spring.React_To_Spring_Forums.dto.request.user.UserCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.react.ReactCreationRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.request.react.ReactUpdateRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ReactResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.React;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ReactMapper {
    React toReact(ReactCreationRequest request);

    void updateReact(@MappingTarget React userProfile, ReactUpdateRequest request);

    ReactResponse toReactResponse(React react);

}
