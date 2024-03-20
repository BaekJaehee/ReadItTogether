package com.ssafy.rit.back.service;

import com.ssafy.rit.back.dto.member.MemberRequestDto;
import com.ssafy.rit.back.entity.Member;

public interface MemberService {

    public void signUp(MemberRequestDto dto);
    public Member findByEmail(String email);
}
