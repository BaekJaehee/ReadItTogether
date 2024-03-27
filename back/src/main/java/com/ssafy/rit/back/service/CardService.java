package com.ssafy.rit.back.service;

import com.ssafy.rit.back.dto.card.renspose.CardCreateResponse;
import com.ssafy.rit.back.dto.card.renspose.CardDeleteResponse;
import com.ssafy.rit.back.dto.card.renspose.CardDetailResponse;
import com.ssafy.rit.back.dto.card.renspose.CardListResponse;
import com.ssafy.rit.back.dto.card.requestDto.CardCreateRequestDto;
import com.ssafy.rit.back.dto.card.requestDto.CardRequestDto;
import org.springframework.http.ResponseEntity;


public interface CardService {

    ResponseEntity<CardDetailResponse> CardDetail(long cardId);
    ResponseEntity<CardListResponse> CardList();
    ResponseEntity<CardDeleteResponse> CardDelete(CardRequestDto dto);
    ResponseEntity<CardCreateResponse> CardCreate(CardCreateRequestDto dto);



}
