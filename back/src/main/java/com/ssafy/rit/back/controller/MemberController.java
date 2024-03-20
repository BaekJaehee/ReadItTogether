package com.ssafy.rit.back.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.rit.back.dto.member.requestDto.CheckEmailRequestDto;
import com.ssafy.rit.back.dto.member.requestDto.CheckNicknameRequestDto;
import com.ssafy.rit.back.dto.member.requestDto.MemberRequestDto;
import com.ssafy.rit.back.dto.member.responseDto.CheckResponseDto;
import com.ssafy.rit.back.dto.member.responseDto.SignUpResponseDto;
import com.ssafy.rit.back.exception.member.EmailAlreadyExistsException;
import com.ssafy.rit.back.exception.member.NicknameAlreadyExistsException;
import com.ssafy.rit.back.serviceImpl.MemberServiceImpl;
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

    @GetMapping("/email")
    public ResponseEntity<CheckResponseDto> checkEmail(@RequestBody CheckEmailRequestDto dto) throws JsonProcessingException {

        log.info("------------중복 이메일 확인: {} -----------------", dto.getEmail());

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse;

        try {
            memberService.checkEmail(dto);
            CheckResponseDto responseDto = new CheckResponseDto("Success", true);

            jsonResponse = objectMapper.writeValueAsString(responseDto);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } catch (EmailAlreadyExistsException e) {
            log.info("--------------이미 존재하는 이메일: {}------------------", dto.getEmail());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/nickname")
    public ResponseEntity<CheckResponseDto> checkNickname(@RequestBody CheckNicknameRequestDto dto) throws JsonProcessingException {

        log.info("------------중복 닉네임 확인: {} -----------------", dto.getNickname());

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonReponse;

        try {
            memberService.checkNickname(dto);
            CheckResponseDto responseDto = new CheckResponseDto("Success", true);

            jsonReponse = objectMapper.writeValueAsString(responseDto);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } catch (NicknameAlreadyExistsException e) {
            log.info("--------------이미 존재하는 닉네임: {}------------------", dto.getNickname());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }



    @GetMapping("/test")
    public String test() {
        log.info("테스트입니당나라송나라");
        return "테통. 테스트 통과라는 뜻";
    }


}
