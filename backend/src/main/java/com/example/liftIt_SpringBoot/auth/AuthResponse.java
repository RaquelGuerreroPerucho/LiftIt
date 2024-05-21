package com.example.liftIt_SpringBoot.auth;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Builder

public class AuthResponse {
    private String token;
}
