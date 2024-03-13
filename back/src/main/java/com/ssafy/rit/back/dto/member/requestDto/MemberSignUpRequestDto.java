package com.ssafy.rit.back.dto.member.requestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class MemberSignUpRequestDto {

    private String email;
    private String password;
    private String name;
    private String nickname;
    private String birth;
    private int gender;

}
