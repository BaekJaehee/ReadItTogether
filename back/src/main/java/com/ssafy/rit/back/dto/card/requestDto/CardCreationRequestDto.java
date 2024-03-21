package com.ssafy.rit.back.dto;

import com.ssafy.rit.back.entity.Book;
import com.ssafy.rit.back.entity.Member;

import java.time.LocalDate;

public class CardCreationRequestDto {
    private String comment;
    private LocalDate createdAt;
    private Member fromMember;
    private Member toMember;
    private Book book;

    // Getters and Setters
}
