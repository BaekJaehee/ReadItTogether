package com.ssafy.rit.back.service;

import com.ssafy.rit.back.dto.member.CustomUserDetails;
import com.ssafy.rit.back.dto.member.response.MemberSignInResponse;
import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Autowired
    public CustomUserDetailsService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // DB에서 조회
        Member member = memberRepository.findByEmail(email);

        if (member != null) {
            return new CustomUserDetails(member);
        }

        return null;
    }
}
