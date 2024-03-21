package com.ssafy.rit.back.dto.library.response;

import com.ssafy.rit.back.dto.library.responseDto.LibraryStatusResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LibraryStatusResponse {

    private String message;

    private LibraryStatusResponseDto data;
}
