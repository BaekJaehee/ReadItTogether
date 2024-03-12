package com.ssafy.rit.back.dto.member.responseDto;

import lombok.Data;

@Data
public class MemberSignInResponseDto {

    private String accessToken;
    private String refreshToken;
}
