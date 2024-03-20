package com.ssafy.rit.back.dto.guestBook.requestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GuestBookCreationRequestDto {

    private String content;
}
