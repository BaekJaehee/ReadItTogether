package com.ssafy.rit.back.util;

import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.exception.member.MemberDisabledException;
import com.ssafy.rit.back.exception.member.MemberNotFoundException;
import com.ssafy.rit.back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CommonUtil {

    private final MemberRepository memberRepository;

    public Member getMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member currentMember = optionalMember.orElseThrow(MemberNotFoundException::new);

        if (currentMember.getIsDisabled() == 1) {
            throw new MemberDisabledException();
        }
        return currentMember;
    }

}
