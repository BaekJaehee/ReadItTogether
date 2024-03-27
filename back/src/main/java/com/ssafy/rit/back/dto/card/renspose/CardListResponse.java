package com.ssafy.rit.back.dto.card.renspose;

import com.ssafy.rit.back.dto.card.responseDto.CardListResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CardListResponse {

    private String message;
    private CardListResponseDto data;

}
