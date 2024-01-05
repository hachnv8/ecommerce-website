package org.hacheery.backend.security.controller;

import lombok.RequiredArgsConstructor;
import org.hacheery.backend.security.model.AuthenticationRequest;
import org.hacheery.backend.security.model.AuthenticationResponse;
import org.hacheery.backend.security.model.RegisterRequest;
import org.hacheery.backend.security.service.AuthenticationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthenticationController {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        logger.info(String.format("Register new user: username = %s, password = %s, email = %s",
                request.getUsername(), request.getPassword(), request.getEmail()));
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        logger.info(String.format("email = %s, password = %s",
                request.getEmail(), request.getPassword()));
        return ResponseEntity.ok(service.authenticate(request));
    }


}
