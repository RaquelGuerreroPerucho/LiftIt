package com.example.liftIt_SpringBoot.config;

import com.example.liftIt_SpringBoot.uitls.ConfigCustom;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {

    @Bean
    public WebMvcConfigurer corsConfigurer(){

        return new WebMvcConfigurer() {
           /* @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**");

            }*/

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:8100",ConfigCustom.getURLIP(), ConfigCustom.getNrogkURl(), "capacitor://localhost")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
