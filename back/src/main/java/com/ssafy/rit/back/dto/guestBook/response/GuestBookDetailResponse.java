package com.ssafy.rit.back.dto.guestBook.response;

import com.ssafy.rit.back.dto.guestBook.responseDto.GuestBookDetailResponseDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GuestBookDetailResponse {

    private String message;

    private GuestBookDetailResponseDto data;
}
