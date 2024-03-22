package com.ssafy.rit.back.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.rit.back.dto.member.requestDto.*;
import com.ssafy.rit.back.dto.member.response.PassingCertificationResponse;
import com.ssafy.rit.back.dto.member.response.SendingCertificationResponse;
import com.ssafy.rit.back.dto.member.response.SendingTemporaryPasswordResponse;
import com.ssafy.rit.back.dto.member.responseDto.VerifyAccessResponseDto;
import com.ssafy.rit.back.dto.member.responseDto.CheckResponseDto;
import com.ssafy.rit.back.dto.member.responseDto.DisableResponseDto;
import com.ssafy.rit.back.dto.member.responseDto.SignUpResponseDto;
import com.ssafy.rit.back.dto.member.responseDto.UpdatePasswordAndNicknameResponseDto;
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

    ObjectMapper objectMapper = new ObjectMapper();
    private final MemberServiceImpl memberService;

    public MemberController(MemberServiceImpl memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponseDto> signUp(@RequestBody MemberRequestDto dto) throws JsonProcessingException {
        log.info("-------------가입 이메일: {}--------------", dto.getEmail());
        memberService.signUp(dto);

        SignUpResponseDto responseDto = new SignUpResponseDto("SignUp Success", true);
        objectMapper.writeValueAsString(responseDto);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/email")
    public ResponseEntity<CheckResponseDto> checkEmail(@RequestBody CheckEmailRequestDto dto) throws JsonProcessingException {

        log.info("------------중복 이메일 확인: {} -----------------", dto.getEmail());


        Boolean checked = memberService.checkEmail(dto);
        if (!checked) {
            log.info("-------------------이멜 중복염:{}", dto.getEmail());
            throw new EmailAlreadyExistsException();
        }
        CheckResponseDto responseDto = new CheckResponseDto("Success", true);
        objectMapper.writeValueAsString(responseDto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);

    }

    @PostMapping("/nickname")
    public ResponseEntity<CheckResponseDto> checkNickname(@RequestBody CheckNicknameRequestDto dto) throws JsonProcessingException {

        log.info("------------중복 닉네임 확인: {} -----------------", dto.getNickname());


        Boolean checked = memberService.checkNickname(dto);
        if (!checked) {
            log.info("-------------------닉넴 중복염:{}", dto.getNickname());
            throw new NicknameAlreadyExistsException();
        }

        CheckResponseDto responseDto = new CheckResponseDto("Success", true);
        objectMapper.writeValueAsString(responseDto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);

    }

    // 회원 탈퇴
    @PostMapping("/disable")
    public ResponseEntity<DisableResponseDto> disable(@RequestBody DisableRequestDto dto) throws JsonProcessingException {

        memberService.updateDisable(dto);

        DisableResponseDto responseDto = new DisableResponseDto("Success", true);
        objectMapper.writeValueAsString(responseDto);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    @PutMapping("/update-password")
    public ResponseEntity<UpdatePasswordAndNicknameResponseDto> updatePassword(@RequestBody UpdatePasswordRequestDto dto) throws JsonProcessingException {

        memberService.updatePassword(dto);

        UpdatePasswordAndNicknameResponseDto responseDto = new UpdatePasswordAndNicknameResponseDto("Success", true);
        objectMapper.writeValueAsString(responseDto);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PutMapping("/update-nickname")
    public ResponseEntity<UpdatePasswordAndNicknameResponseDto> updateNickname(@RequestBody UpdateNicknameRequestDto dto) throws JsonProcessingException {

        memberService.updateNickname(dto);
        UpdatePasswordAndNicknameResponseDto responseDto = new UpdatePasswordAndNicknameResponseDto("Success", true);
        objectMapper.writeValueAsString(responseDto);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/test")
    public String test() {
        log.info("테스트입니당나라송나라");
        return "테통. 테스트 통과라는 뜻";
    }

    // 인증 메일 발송
    @PostMapping("/send-certification")
    public ResponseEntity<SendingCertificationResponse> sendEmailCertificate(@RequestBody SendingCertificationRequestDto sendingCertificationRequestDto) {
        return memberService.sendEmailCertificate(sendingCertificationRequestDto);
    }

    // 인증 코드 검증
    @PostMapping("/pass-certification")
    public ResponseEntity<PassingCertificationResponse> passEmailCertificate(@RequestBody PassingCertificationRequestDto passingCertificationRequestDto) {
        return memberService.passEmailCertificate(passingCertificationRequestDto);
    }

    // 임시비밀번호 발급
    @PostMapping("/temporary-password")
    public ResponseEntity<SendingTemporaryPasswordResponse> sendTemporaryPassword(@RequestBody SendingTemporaryPasswordRequestDto sendingTemporaryPasswordRequestDto) {
        return memberService.sendTemporaryPassword(sendingTemporaryPasswordRequestDto);
    }

    @PostMapping("/verify-access")
    public ResponseEntity<VerifyAccessResponseDto> verifyAccess(@RequestBody VerifyAccessRequestDto dto) {

        Boolean isVerified = memberService.verifyAccess(dto);
        if (!isVerified) {
            VerifyAccessResponseDto responseDto = new VerifyAccessResponseDto("failed to verified", false);
            return new ResponseEntity<>(responseDto, HttpStatus.BAD_REQUEST);
        }

        VerifyAccessResponseDto responseDto = new VerifyAccessResponseDto("Success", true);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
        // git checkout -t origin/back
    }

}
