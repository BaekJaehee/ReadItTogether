package com.ssafy.rit.back.dto.card.responseDto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceivedCardResponseInfoDto {

    private Long cardId;
    private String bookTitle;
    private String bookCover;

}
