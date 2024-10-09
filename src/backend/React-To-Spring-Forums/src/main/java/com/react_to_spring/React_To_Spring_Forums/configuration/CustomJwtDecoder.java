package com.react_to_spring.React_To_Spring_Forums.configuration;

import com.react_to_spring.React_To_Spring_Forums.dto.request.authentication.IntrospectRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.IntrospectResponse;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.service.authentication.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.util.Objects;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomJwtDecoder implements JwtDecoder {

    AuthenticationService authenticationService;

    @NonFinal
    @Value("${jwt.accessSignerKey}")
    String ACCESS_SIGNER_KEY;

    @NonFinal
    NimbusJwtDecoder nimbusJwtDecoder = null;

    @Override
    public Jwt decode(String token) throws JwtException {
        IntrospectResponse introspectResponse = authenticationService.introspect(
                IntrospectRequest.builder().token(token).build());

        if (!introspectResponse.isValid()) {
            throw new JwtException(ErrorCode.INVALID_TOKEN.getMessage());
        }

        if (Objects.isNull(nimbusJwtDecoder)) {
            SecretKeySpec secretKeySpec = new SecretKeySpec(ACCESS_SIGNER_KEY.getBytes(), "SH512");

            nimbusJwtDecoder = NimbusJwtDecoder
                    .withSecretKey(secretKeySpec)
                    .macAlgorithm(MacAlgorithm.HS512)
                    .build();
        }

        return nimbusJwtDecoder.decode(token);
    }
}
