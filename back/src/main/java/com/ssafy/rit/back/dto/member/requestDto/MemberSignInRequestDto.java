package com.ssafy.rit.back.dto.member.requestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MemberSignInRequestDto {

    private String email;
    private String password;
}
