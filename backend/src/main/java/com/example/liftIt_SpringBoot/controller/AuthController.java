package com.example.liftIt_SpringBoot.controller;

import com.example.liftIt_SpringBoot.auth.AuthResponse;
import com.example.liftIt_SpringBoot.auth.LoginRequest;
import com.example.liftIt_SpringBoot.auth.RegisterRequest;
import com.example.liftIt_SpringBoot.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        System.out.println("Procede a logear");

        AuthResponse authResponse = authService.login(request);

        System.out.println("Respuesta "+authResponse.toString());

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse authResponse = authService.register(request);
        System.out.println("AAAAAAAAAAAAAAAAA");

        System.out.println(request);
        return ResponseEntity.ok(authResponse);
    }
}
