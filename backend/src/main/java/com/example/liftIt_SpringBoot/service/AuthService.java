package com.example.liftIt_SpringBoot.service;

import com.example.liftIt_SpringBoot.auth.AuthResponse;
import com.example.liftIt_SpringBoot.auth.LoginRequest;
import com.example.liftIt_SpringBoot.auth.RegisterRequest;
import com.example.liftIt_SpringBoot.model.Role;
import com.example.liftIt_SpringBoot.model.UserModel;
import com.example.liftIt_SpringBoot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authenticationManager;


    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        UserDetails user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        String token = jwtService.getToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        UserModel userModel = UserModel.builder()
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(userModel);

        return AuthResponse.builder()
                .token(jwtService.getToken(userModel))
                .build();
    }
}