package com.ssafy.rit.back.controller;

import com.ssafy.rit.back.dto.member.MemberRequestDto;
import com.ssafy.rit.back.serviceImpl.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
@CrossOrigin("*")
public class MemberController {

    private final MemberServiceImpl memberService;

    public MemberController(MemberServiceImpl memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    public String signUp(@RequestBody MemberRequestDto dto) {
        System.out.println("이멜: " + dto.getEmail());
        memberService.signUp(dto);

        return "SignUp Success";
    }

    @GetMapping("/test")
    public String test() {
        System.out.println("테스트입니당나라송나라");
        return "테통. 테스트 통과라는 뜻";
    }


}
