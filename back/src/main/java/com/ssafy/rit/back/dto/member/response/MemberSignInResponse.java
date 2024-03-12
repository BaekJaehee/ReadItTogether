package com.ssafy.rit.back.dto.member.response;

import com.ssafy.rit.back.dto.member.responseDto.MemberSignInResponseDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberSignInResponse {

    private String message;
    private MemberSignInResponseDto data;

    public static MemberSignInResponse createMemberSignInResponse(String message, MemberSignInResponseDto dto) {
        return MemberSignInResponse.builder()
                .message(message)
                .data(dto)
                .build();
    }
}
