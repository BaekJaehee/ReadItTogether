package com.ssafy.rit.back.dto.library.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class LibraryIntroResponseDto {

    private String intro;

    private int isMine;

    private int isReceive;
}
