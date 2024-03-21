package com.ssafy.rit.back.security.filter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.ssafy.rit.back.repository.RefreshRepository;
import com.ssafy.rit.back.security.jwt.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.io.PrintWriter;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, RefreshRepository refreshRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        System.out.println("-----------로그인 시도 중---------");
        try {
            ObjectMapper om = new ObjectMapper();

            JsonNode jsonNode = om.readTree(request.getInputStream());

            String email = jsonNode.get("email").asText();
            String password = jsonNode.get("password").asText();

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password, null);

            return authenticationManager.authenticate(authToken);


        } catch (Exception e) {
            response.setStatus(401);
        }

        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {

        String email = authentication.getName();

        String accessToken = jwtUtil.createJwt("Authorization", email, 600000L);
        String refreshToken = jwtUtil.createJwt("refresh", email, 86400000L);

//        addRefreshEntity(email, refreshToken, 86400000L);

        response.setHeader("Authorization", accessToken);
        response.addCookie(createCookie("refresh", refreshToken));
        response.setStatus(HttpStatus.OK.value());

        System.out.println("로그인 완료염");

        response.setContentType("application/json; charset=UTF-8");
        PrintWriter writer = response.getWriter();

        // 로그인 성공 시 프론트에게 토큰 전달(json형식)
        JsonObject tokenData = new JsonObject();
        tokenData.addProperty("accessToken", accessToken);
        tokenData.addProperty("refreshToken", refreshToken);

        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("message", "Login success");
        jsonResponse.add("data", tokenData);

        writer.print(jsonResponse.toString());
        writer.flush();

    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {

//        response.setStatus(401);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String errorMessage;
        int statusCode;

        if (failed instanceof UsernameNotFoundException) {
            errorMessage = "User not found";
            statusCode = HttpServletResponse.SC_NOT_FOUND;
        } else if (failed instanceof BadCredentialsException) {
            errorMessage = "Password does not match";
            statusCode = HttpServletResponse.SC_UNAUTHORIZED;
        } else {
            errorMessage = "Authentication failed";
            statusCode = HttpServletResponse.SC_UNAUTHORIZED;
        }

        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("errorMessage", errorMessage);

        PrintWriter writer = response.getWriter();
        writer.print(jsonResponse.toString());
        writer.flush();

        // 실패 시 적절한 상태 코드 반환
        response.setStatus(statusCode);
    }


    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        cookie.setHttpOnly(true);

        return cookie;
    }

    /*
    private void addRefreshEntity(String email, String refreshToken, Long expiredMs) {
        Date date = new Date(System.currentTimeMillis() + expiredMs);

        RefreshEntity refreshEntity = new RefreshEntity();
        refreshEntity.setEmail(email);
        refreshEntity.setRefresh(refreshToken);
        refreshEntity.setExpiration(date.toString());

        refreshRepository.save(refreshEntity);
    }
    */
}
