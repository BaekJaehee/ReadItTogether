package com.ssafy.rit.back.dto.library.responseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LibraryStatusResponseDto {

    private String intro;

    private int isReceivable;
}
