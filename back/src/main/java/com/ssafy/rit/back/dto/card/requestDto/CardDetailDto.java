package com.ssafy.rit.back.dto.card.requestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardDetailDto {
    private Long id;
    private String comment; // 카드의 코멘트
    private LocalDate createdAt; // 카드 생성 날짜
    private String fromMemberName; // 보낸 사람의 이름 또는 식별 정보
    private String toMemberName; // 받는 사람의 이름 또는 식별 정보
    private String bookCover; // 책의 표지 이미지 URL

    // 생성자, 게터, 세터 등
}