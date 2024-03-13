package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.member.requestDto.MemberSignUpRequestDto;
import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.repository.MemberRepository;
import com.ssafy.rit.back.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Boolean existsByEmail(String email) {
        return memberRepository.existsByEmail(email);
    }



    public void signUp(MemberSignUpRequestDto dto) {

        String email = dto.getEmail();
        String password = dto.getPassword();
        String name = dto.getName();
        String nickname = dto.getNickname();
        String birth = dto.getBirth();
        int gender = dto.getGender();


        Boolean isExist = memberRepository.existsByEmail(email);

        // 이미 가입한 유저는 return 처리
        if (isExist) {
            return;
        }

        Member memberData = Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .name(name)
                .nickname(nickname)
                .birth(birth)
                .gender(gender)
                .build();


        memberRepository.save(memberData);
    }
}
