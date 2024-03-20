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

        return "가입 완료염ㅋㅋ";
    }

    @GetMapping("/test")
    public String test() {
        System.out.println("이거맞나~?");
        return "허가증 가져왔구나";
    }


}
