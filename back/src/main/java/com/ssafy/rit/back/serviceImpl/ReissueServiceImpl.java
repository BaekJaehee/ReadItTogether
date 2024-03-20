package com.ssafy.rit.back.serviceImpl;

import com.google.gson.JsonObject;
import com.ssafy.rit.back.security.jwt.JWTUtil;
import com.ssafy.rit.back.service.ReissueService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.PrintWriter;

@Service
public class ReissueServiceImpl implements ReissueService {

    private final JWTUtil jwtUtil;

    public ReissueServiceImpl(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public ResponseEntity<?> reissueToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
            }
        }

        if (refresh == null) {
            return new ResponseEntity<>("there is NO refreshToken", HttpStatus.BAD_REQUEST);
        }

        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            return new ResponseEntity<>("refreshToken expired", HttpStatus.BAD_REQUEST);
        }

        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refresh")) {
            return new ResponseEntity<>("NOT A RefreshToken", HttpStatus.BAD_REQUEST);
        }

        String email = jwtUtil.getEmail(refresh);

        String newAccess = jwtUtil.createJwt("Authorization", email, 600000L);
        String newRefresh = jwtUtil.createJwt("refresh", email, 86400000L);

        response.setContentType("application/json; charset=UTF-8");
        PrintWriter writer = response.getWriter();

        JsonObject tokenData = new JsonObject();
        tokenData.addProperty("newAccessToken", newAccess);
        tokenData.addProperty("newRefreshToken", newRefresh);

        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("messages", "Login success");
        jsonResponse.add("data", tokenData);

        writer.print(jsonResponse.toString());
        writer.flush();

        response.setHeader("Authorization", newAccess);
        response.addCookie(createCookie("refresh", newRefresh));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setHttpOnly(true);
        return cookie;
    }
}
