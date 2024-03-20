package com.ssafy.rit.back.dto.guestBook.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDetailResponseDto {

    private String title;

    private String cover;

    private String author;

    private String info;

    private String pubDate;

    private String publisher;

    private int page;

    private int rating;

    private int reviewerCnt;

    private String isbn;

}
