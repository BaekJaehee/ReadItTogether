package com.ssafy.rit.back.service;

import com.ssafy.rit.back.dto.CardCreationRequestDto;
import com.ssafy.rit.back.entity.Card;

public interface CardService {
    Card createCard(CardCreationRequestDto requestDto);
}
