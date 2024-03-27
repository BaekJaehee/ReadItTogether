package com.ssafy.rit.back.dto.card.requestDto;
import java.time.LocalDate;
import java.util.List;

public class CardCreationRequestDto {
    private String content;
    private String comment;
    private int bId;
    private Long followerIds; // 받는 사람들의 ID 목록

    // Getters and Setters
}
