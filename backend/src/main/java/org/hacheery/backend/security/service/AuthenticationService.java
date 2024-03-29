package org.hacheery.backend.security.service;

import lombok.RequiredArgsConstructor;
import org.hacheery.backend.dto.UserDto;
import org.hacheery.backend.exception.BadCredentialsException;
import org.hacheery.backend.exception.DuplicateException;
import org.hacheery.backend.exception.SQLException;
import org.hacheery.backend.mapper.UserMapper;
import org.hacheery.backend.security.entity.Role;
import org.hacheery.backend.security.entity.Token;
import org.hacheery.backend.security.entity.TokenType;
import org.hacheery.backend.security.entity.User;
import org.hacheery.backend.security.model.AuthenticationRequest;
import org.hacheery.backend.security.model.AuthenticationResponse;
import org.hacheery.backend.security.model.RegisterRequest;
import org.hacheery.backend.security.repository.TokenRepository;
import org.hacheery.backend.security.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        boolean isEmailExist = repository.existsByEmail(request.getEmail());
        if (isEmailExist) {
            throw new DuplicateException("Email already exists");
        }
        try {
            var user = User.builder()
                    .name(request.getUsername())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .build();
            var savedUser = repository.save(user);
            var jwtToken = jwtService.generateToken(savedUser);
            saveUserToken(savedUser, jwtToken);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } catch (DataIntegrityViolationException e) {
            throw new SQLException(e.getLocalizedMessage(), e);
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            var user = repository.findByEmail(request.getEmail())
                    .orElseThrow();
            var jwtToken = jwtService.generateToken(user);
            revokeAllUserTokens(user);
            saveUserToken(user, jwtToken);
            UserDto userDto = UserMapper.mapToUserDto(user);
            return AuthenticationResponse.builder()
                    .user(userDto)
                    .token(jwtToken)
                    .build();
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username or password");
        }

    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .userId(user.getId())
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
