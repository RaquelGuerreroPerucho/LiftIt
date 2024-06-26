package com.example.liftIt_SpringBoot.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class RegisterRequest {
    private String email;
    private String password;
    private String username;

    private String preguntaSeguridad;

    private String respuestaSeguridad;
}
