package com.ssafy.rit.back.util;

import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.exception.member.MemberDisabledException;
import com.ssafy.rit.back.exception.member.MemberNotFoundException;
import com.ssafy.rit.back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommonUtil {

    private final MemberRepository memberRepository;

    public Member getMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        Member currentMember = memberRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new MemberNotFoundException("해당 유저가 존재하지 않습니다."));
        if (currentMember.getIsDisabled() == 1) {
            throw new MemberDisabledException("해당 유저는 탈퇴했습니다.");
        }
        return currentMember;
    }
}
