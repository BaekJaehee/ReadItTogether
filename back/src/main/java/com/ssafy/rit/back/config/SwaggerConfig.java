package com.ssafy.rit.back.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

    @OpenAPIDefinition(
            info = @Info(title = "리딧투게더 api",
                    description = "리딧투게더 api",
                    version = "v1"
            )
    )
    @Configuration
    public class SwaggerConfig {

        @Bean
        public GroupedOpenApi memberApi() {
            return GroupedOpenApi.builder()
                    .group("member-api")
                    .pathsToMatch("/members/**")
                    .build();
        }

        @Bean
        public GroupedOpenApi loginApi() {
            return GroupedOpenApi.builder()
                    .group("login-api")
                    .pathsToMatch("/login")
                    .build();
        }

        @Bean
        public OpenAPI openAPI(){
            SecurityScheme securityScheme = new SecurityScheme()
                    .type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")
                    .in(SecurityScheme.In.HEADER).name("Authorization");
            SecurityRequirement securityRequirement = new SecurityRequirement().addList("bearerAuth");

            return new OpenAPI()
                    .components(new Components().addSecuritySchemes("bearerAuth", securityScheme))
                    .security(Arrays.asList(securityRequirement));
        }
    }
