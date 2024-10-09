package com.react_to_spring.React_To_Spring_Forums.service.authentication;

import com.react_to_spring.React_To_Spring_Forums.dto.request.authentication.*;
import com.react_to_spring.React_To_Spring_Forums.dto.response.AuthenticationResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.IntrospectResponse;

public interface AuthenticationService {
    IntrospectResponse introspect(IntrospectRequest request);

    AuthenticationResponse authenticate(AuthenticationRequest request);

    void logout(LogoutRequest request);

    void changePassword(ChangePasswordRequest request);

    AuthenticationResponse refresh(RefreshTokenRequest request);
}
