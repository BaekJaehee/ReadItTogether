package com.ssafy.rit.back.dto.member.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DataDto {

    private String accessToken;
    private String refreshToken;
    private Long memberId;
}
