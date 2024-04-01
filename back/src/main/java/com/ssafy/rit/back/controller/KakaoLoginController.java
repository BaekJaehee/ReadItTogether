package com.ssafy.rit.back.controller;

import com.ssafy.rit.back.dto.member.responseDto.DataDto;
import com.ssafy.rit.back.dto.member.responseDto.SignInResponseDto;
import com.ssafy.rit.back.serviceImpl.KakaoLoginServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.security.auth.login.LoginException;
import java.io.IOException;

@RestController
@CrossOrigin("*")
public class KakaoLoginController {

    private KakaoLoginServiceImpl kakaoLoginService;

    public KakaoLoginController(KakaoLoginServiceImpl kakaoLoginService) {
        this.kakaoLoginService = kakaoLoginService;
    }


    @GetMapping("/klogin")
    public ResponseEntity<String> kakaoLogin() {
        System.out.println("get이라고");
        String redirectUri = kakaoLoginService.getAuthorizationUrl();
        return ResponseEntity.status(HttpStatus.FOUND).header("Location", redirectUri).build();
    }

    @GetMapping("/login/oauth2/code/kakao")
    public ResponseEntity<SignInResponseDto> handleCallback(@RequestParam("code")String code, HttpServletResponse response) throws LoginException, IOException {
        // 카카오로부터 받은 인가 코드 처리
        DataDto datadto = kakaoLoginService.processAuthorizationCode(code, response);
        SignInResponseDto responseDto = new SignInResponseDto("Login Success", datadto);
        Long memberId = datadto.getMemberId();

        try {
            response.sendRedirect("http://localhost:3000/" + memberId);
        } catch (IOException e) {
            throw new LoginException("로그인 실패");
        }

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
