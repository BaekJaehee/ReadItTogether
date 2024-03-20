package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.member.requestDto.CheckEmailRequestDto;
import com.ssafy.rit.back.dto.member.requestDto.MemberRequestDto;
import com.ssafy.rit.back.dto.member.requestDto.CheckNicknameRequestDto;
import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.exception.member.EmailAlreadyExistsException;
import com.ssafy.rit.back.exception.member.NicknameAlreadyExistsException;
import com.ssafy.rit.back.repository.MemberRepository;
import com.ssafy.rit.back.service.MemberService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder){
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
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
        optionalMember.ifPresent(member -> {
            throw new EmailAlreadyExistsException("Email already exists");
        });

        return false;
    }


    public Boolean checkNickname(CheckNicknameRequestDto dto) {

        Optional<Member> optionalMember = memberRepository.findByNickname(dto.getNickname());
        optionalMember.ifPresent(member -> {
            throw new NicknameAlreadyExistsException("Nickname already exists");
        });

        return false;
    }

}
