package com.ssafy.rit.back.controller;

import com.ssafy.rit.back.dto.member.requestDto.MemberSignUpRequestDto;
import com.ssafy.rit.back.serviceImpl.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
@CrossOrigin("*")
public class MemberController {

    private final MemberServiceImpl memberService;

    @PostMapping("/signup")
    public String signUp(MemberSignUpRequestDto dto) {
        System.out.println(dto.getNickname() + "님이 가입하려고 해염");
        memberService.signUp(dto);

        return "가입 완료염";
    }

}
