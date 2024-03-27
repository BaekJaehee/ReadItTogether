package com.ssafy.rit.back.service;

import com.ssafy.rit.back.dto.card.renspose.CardCreateReponse;
import com.ssafy.rit.back.dto.card.renspose.CardDeleteResponse;
import com.ssafy.rit.back.dto.card.renspose.CardDetailResponse;
import com.ssafy.rit.back.dto.card.renspose.CardListResponse;
import com.ssafy.rit.back.dto.card.requestDto.CardCreationRequestDto;
import org.springframework.http.ResponseEntity;


public interface CardService {

    ResponseEntity<CardDetailResponse> CardDetail(long cardId);
    ResponseEntity<CardListResponse> CardList();
    ResponseEntity<CardDeleteResponse> CardDelete(long cardId);
    ResponseEntity<CardCreateReponse> CardCreate(CardCreationRequestDto dto);



}
