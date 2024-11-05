package com.react_to_spring.React_To_Spring_Forums.service.authentication;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.react_to_spring.React_To_Spring_Forums.dto.request.authentication.*;
import com.react_to_spring.React_To_Spring_Forums.dto.response.AuthenticationResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.IntrospectResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.InvalidatedToken;
import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.repository.InvalidatedTokenRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.VerifyCodeRepository;
import com.react_to_spring.React_To_Spring_Forums.service.verifycode.VerifyCodeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationServiceImp implements AuthenticationService {

    InvalidatedTokenRepository invalidatedTokenRepository;
    UserRepository userRepository;
    VerifyCodeRepository verifyCodeRepository;

    PasswordEncoder passwordEncoder;

    @NonFinal
    @Value("${jwt.accessSignerKey}")
    String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.refreshSignerKey}")
    String REFRESH_SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    long REFRESHABLE_DURATION;

    VerifyCodeService verifyCodeService;

    @Override
    public IntrospectResponse introspect(IntrospectRequest request) {

        boolean isValid = true;

        try {
            verifyToken(request.getToken(), false);
        } catch (AppException e) {
            isValid = false;
        }

        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_USERNAME_PASSWORD));

        if (verifyCodeRepository.existsByUserId(user.getId())) {
            throw new AppException(ErrorCode.ACCOUNT_NOT_VERIFIED);
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.INVALID_USERNAME_PASSWORD);
        }

        return buildAuthenticationResponse(user);
    }

    @Override
    public void logout(LogoutRequest request) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(request.getToken());
            String acId = signedJWT.getJWTClaimsSet().getJWTID();
            String rfId = signedJWT.getJWTClaimsSet().getClaim("rfId").toString();

            Instant expirationInstant = signedJWT.getJWTClaimsSet().getExpirationTime().toInstant();
            LocalDateTime expirationTime = LocalDateTime.ofInstant(expirationInstant, ZoneId.systemDefault());
            expirationTime = expirationTime.plusSeconds(REFRESHABLE_DURATION - VALID_DURATION);

            invalidatedTokenRepository.save(InvalidatedToken.builder()
                            .accessId(acId)
                            .refreshId(rfId)
                            .expirationTime(expirationTime)
                    .build());
        } catch (ParseException e) {
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
    }

    @Override
    public void changePassword(ChangePasswordRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findById(authentication.getName())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.INCORRECT_PASSWORD);
        }

        if (request.getOldPassword().equals(request.getNewPassword())) {
            throw new AppException(ErrorCode.SAME_PASSWORD);
        }

        // verify code
        if(!verifyCodeService.verifyCode(user.getId(), request.getVerificationCode())) { // expire
             throw new AppException(ErrorCode.VERIFY_CODE_EXPIRED);
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public AuthenticationResponse refresh(RefreshTokenRequest request) {
        SignedJWT signedJWT = verifyToken(request.getRefreshToken(), true);

        try {
            String acId = signedJWT.getJWTClaimsSet().getClaim("acId").toString();
            String rfId = signedJWT.getJWTClaimsSet().getJWTID();

            Instant expirationInstant = signedJWT.getJWTClaimsSet().getExpirationTime().toInstant();
            LocalDateTime expirationTime = LocalDateTime.ofInstant(expirationInstant, ZoneId.systemDefault());
            expirationTime = expirationTime.plusSeconds(REFRESHABLE_DURATION - VALID_DURATION);

            invalidatedTokenRepository.save(InvalidatedToken.builder()
                    .accessId(acId)
                    .refreshId(rfId)
                    .expirationTime(expirationTime)
                    .build());

            User user = userRepository.findById(signedJWT.getJWTClaimsSet().getSubject())
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

            return buildAuthenticationResponse(user);
        } catch (ParseException e) {
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
    }

    private AuthenticationResponse buildAuthenticationResponse(User user) {
        String acId = UUID.randomUUID().toString();
        String rfId = UUID.randomUUID().toString();

        String accessToken = generateToken(user, VALID_DURATION, acId, rfId, SIGNER_KEY);
        String refreshToken = generateToken(user, REFRESHABLE_DURATION, rfId, acId, REFRESH_SIGNER_KEY);

        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    private SignedJWT verifyToken(String token, boolean isRefresh) {
        JWSVerifier verifier;

        try {
            if (isRefresh) {
                verifier = new MACVerifier(REFRESH_SIGNER_KEY);
            } else {
                verifier = new MACVerifier(SIGNER_KEY);
            }

            SignedJWT signedJWT = SignedJWT.parse(token);

            Date expirationTime = signedJWT.getJWTClaimsSet().getExpirationTime();

            String id = signedJWT.getJWTClaimsSet().getJWTID();
            boolean verified = signedJWT.verify(verifier);

            if (!verified || expirationTime.before(new Date())) {
                throw new AppException(ErrorCode.INVALID_TOKEN);
            }

            if (invalidatedTokenRepository.existsByAccessIdOrRefreshId(id)) {
                throw new AppException(ErrorCode.INVALID_TOKEN);
            }

            return signedJWT;
        } catch (ParseException | JOSEException e) {
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
    }

    private String generateToken(User user, long duration, String id, String otherId, String signerKey) {
        JWSHeader header = new JWSHeader.Builder(JWSAlgorithm.HS512).build();
        JWTClaimsSet claimsSet = null;

        if (signerKey.equals(SIGNER_KEY)) {
            claimsSet = buildAccessTokenClaims(user, duration, id, otherId);
        } else if (signerKey.equals(REFRESH_SIGNER_KEY)) {
            claimsSet = buildRefreshTokenClaims(user, duration, id, otherId);
        }

        Payload payload = claimsSet.toPayload();

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(signerKey));

            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw  new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
    }

    private JWTClaimsSet buildAccessTokenClaims(User user, long duration, String id, String otherId) {
        return new JWTClaimsSet.Builder()
                .subject(user.getId())
                .jwtID(id)
                .issuer("React-To-Spring-Team")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(duration, ChronoUnit.SECONDS).toEpochMilli()))
                .claim("rfId", otherId)
                .claim("scope", buildScope(user))
                .build();
    }

    private JWTClaimsSet buildRefreshTokenClaims(User user, long duration, String id, String otherId) {
        return new JWTClaimsSet.Builder()
                .subject(user.getId())
                .jwtID(id)
                .issuer("React-To-Spring-Team")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(duration, ChronoUnit.SECONDS).toEpochMilli()))
                .claim("acId", otherId)
                .claim("scope", buildScope(user))
                .build();
    }

    private String buildScope(User user) {
        StringJoiner joiner = new StringJoiner(" ");
        joiner.add("ROLE_" + user.getRole().getName());
        user.getRole().getPermissions().forEach(permission -> joiner.add(permission.getName()));

        return joiner.toString();
    }
}
