package com.ssafy.rit.back.dto.guestBook.response;

import com.ssafy.rit.back.dto.guestBook.responseDto.BookDetailResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDetailResponse {

    private String message;

    private BookDetailResponseDto data;

}
