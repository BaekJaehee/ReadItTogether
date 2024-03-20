package com.ssafy.rit.back.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.rit.back.dto.member.MemberRequestDto;
import com.ssafy.rit.back.dto.member.responseDto.SignUpResponseDto;
import com.ssafy.rit.back.serviceImpl.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
@CrossOrigin("*")
@Slf4j
public class MemberController {

    private final MemberServiceImpl memberService;

    public MemberController(MemberServiceImpl memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponseDto> signUp(@RequestBody MemberRequestDto dto) {
        log.info("-------------가입 이메일: {}--------------", dto.getEmail());
        memberService.signUp(dto);

        SignUpResponseDto responseDto = new SignUpResponseDto("SignUp Success", true);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse;
        try {
            jsonResponse = objectMapper.writeValueAsString(responseDto);
        } catch (JsonProcessingException e) {
            jsonResponse = "{\"error\": \"Error occurred while processing JSON response\"}";
            e.printStackTrace();
        }


        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/test")
    public String test() {
        log.info("테스트입니당나라송나라");
        return "테통. 테스트 통과라는 뜻";
    }


}
