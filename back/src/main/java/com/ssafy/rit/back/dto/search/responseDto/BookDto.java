package com.ssafy.rit.back.dto.search.responseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    private int bId;
    private String cover;
    private String title;
    private String author;
    private Integer ratings;
    private String pubDate;
}