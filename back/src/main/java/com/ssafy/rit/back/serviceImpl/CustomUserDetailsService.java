package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.member.CustomUserDetails;
import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.repository.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    public CustomUserDetailsService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member memberData = memberRepository.findByEmail(email);

        if (memberData != null) {
            return new CustomUserDetails(memberData);
        }

        return null;
    }
}
