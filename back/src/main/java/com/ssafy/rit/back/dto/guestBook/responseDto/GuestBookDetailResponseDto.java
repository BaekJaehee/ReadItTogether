package com.ssafy.rit.back.dto.guestBook.responseDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GuestBookDetailResponseDto {

    private String content;

    public static GuestBookDetailResponseDto createGuestBookDetailResponseDto(String content) {
        return GuestBookDetailResponseDto.builder()
                .content(content)
                .build();
    }
}
