package com.ssafy.rit.back.controller;

import com.ssafy.rit.back.dto.card.renspose.CardCreateResponse;
import com.ssafy.rit.back.dto.card.renspose.CardDeleteResponse;
import com.ssafy.rit.back.dto.card.renspose.CardDetailResponse;
import com.ssafy.rit.back.dto.card.renspose.CardListResponse;
import com.ssafy.rit.back.dto.card.requestDto.CardCreateRequestDto;
import com.ssafy.rit.back.dto.card.requestDto.CardRequestDto;
import com.ssafy.rit.back.service.CardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/card")
@CrossOrigin("*")
@Slf4j
public class CardController {

    private final CardService cardService;

    @PostMapping("/create")
    public ResponseEntity<CardCreateResponse> createCard(@RequestBody CardCreateRequestDto requestDto) {
        return cardService.CardCreate(requestDto);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<CardDeleteResponse> deleteCard(@RequestBody CardRequestDto requestDto) {
        return cardService.CardDelete(requestDto);
    }

    @GetMapping("/detail/{cardId}")
    public ResponseEntity<CardDetailResponse> getCardDetail(@PathVariable long cardId) {
        return cardService.CardDetail(cardId);
    }

    @GetMapping("/list")
    public ResponseEntity<CardListResponse> getCardList() {
        return cardService.CardList();
    }
}
