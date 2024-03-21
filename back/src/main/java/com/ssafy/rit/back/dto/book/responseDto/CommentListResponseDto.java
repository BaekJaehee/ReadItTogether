package com.ssafy.rit.back.dto.book.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentListResponseDto {

    private String nickname;

    private int rating;

    private String comment;

    private LocalDate createAt;

}
