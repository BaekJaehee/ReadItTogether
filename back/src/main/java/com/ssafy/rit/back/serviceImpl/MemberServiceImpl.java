package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.member.requestDto.CheckEmailRequestDto;
import com.ssafy.rit.back.dto.member.requestDto.DisableRequestDto;
import com.ssafy.rit.back.dto.member.requestDto.MemberRequestDto;
import com.ssafy.rit.back.dto.member.requestDto.CheckNicknameRequestDto;
import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.exception.member.EmailAlreadyExistsException;
import com.ssafy.rit.back.exception.member.MemberNotFoundException;
import com.ssafy.rit.back.exception.member.NicknameAlreadyExistsException;
import com.ssafy.rit.back.repository.MemberRepository;
import com.ssafy.rit.back.service.MemberService;
import com.ssafy.rit.back.util.CommonUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Log4j2
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CommonUtil commonUtil;

    public MemberServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CommonUtil commonUtil){
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.commonUtil = commonUtil;
    }

    @Override
    public void signUp(MemberRequestDto dto) {

        String email = dto.getEmail();
        String password = dto.getPassword();
        String name = dto.getName();
        String nickname = dto.getNickname();
        String birth = dto.getBirth();
        int gender = dto.getGender();

        Boolean isJoined = memberRepository.existsByEmail(email);
        if (isJoined) {
            return;
        }

        Member data = Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .name(name)
                .nickname(nickname)
                .birth(birth)
                .gender(gender)
                .build();

        memberRepository.save(data);
    }


    public Boolean checkEmail(CheckEmailRequestDto dto) {

        Optional<Member> optionalMember = memberRepository.findByEmail(dto.getEmail());
        if (optionalMember.isPresent()) {
            return false;
        }

        return true;
    }


    public Boolean checkNickname(CheckNicknameRequestDto dto) {

        Optional<Member> optionalMember = memberRepository.findByNickname(dto.getNickname());
        if (optionalMember.isPresent()) {
            return false;
        }

        return true;
    }


    // 회원 탈퇴 요청이 들어오면 비밀번호 검증
    public Member checkPassword(DisableRequestDto dto) {

        // 현재 요청을 보내는 Member
        Member currentMember = commonUtil.getMember();
        String currentEmail = currentMember.getEmail();

        // DB에서 email을 통해 찾은 Member
        Member member = memberRepository.findByEmail(currentEmail).orElseThrow(MemberNotFoundException::new);

        String rawPassword = dto.getPassword();
        String hashedPassword = member.getPassword();

        log.info("-------------------------------------------------------");
        log.info(".....................비밀번호 검증 중.....................");
        log.info("-------------------------------------------------------");

        if (!passwordEncoder.matches(rawPassword, hashedPassword)) {
            return null;
        }

        return member;
    }

    @Transactional
    public void updateDisable(DisableRequestDto dto) {

        Member targetMember = checkPassword(dto);
        if (targetMember != null) {
            log.info("--------------------변경 전: {}--------------------", targetMember.getIsDisabled());
            targetMember.updateDisable();
            log.info("--------------------변경 후: {}--------------------", targetMember.getIsDisabled());
        }
    }

}
