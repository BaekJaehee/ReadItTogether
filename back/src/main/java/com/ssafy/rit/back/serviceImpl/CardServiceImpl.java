package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.card.renspose.CardCreateReponse;
import com.ssafy.rit.back.dto.card.renspose.CardDeleteResponse;
import com.ssafy.rit.back.dto.card.renspose.CardDetailResponse;
import com.ssafy.rit.back.dto.card.renspose.CardListResponse;
import com.ssafy.rit.back.dto.card.requestDto.CardCreationRequestDto;
import com.ssafy.rit.back.dto.card.requestDto.CardDetailDto;
import com.ssafy.rit.back.dto.card.responseDto.CardDetailResponseDto;
import com.ssafy.rit.back.entity.Book;
import com.ssafy.rit.back.entity.Card;
import com.ssafy.rit.back.repository.*;
import com.ssafy.rit.back.service.CardService;
import com.ssafy.rit.back.util.CommonUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class CardServiceImpl implements CardService {

    private final BookRepository bookRepository;
    private final CommentRepository commentRepository;
    private final CommonUtil commonUtil;
    private final CardRepository cardRepository;


    @Override
    public ResponseEntity<CardDetailResponse> CardDetail(long cardId) {
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        Book book = card.getBookId();
        CardDetailDto responseDto = new CardDetailDto();
        responseDto.setId(cardId);
        responseDto.setComment(card.getComment());
        if (book != null) {
            responseDto.setBookCover(book.getCover());
        }
        CardDetailResponse response = new CardDetailResponse("Success", responseDto);
        return ResponseEntity.ok(response);
    }


    @Override
    public ResponseEntity<CardListResponse> CardList() {
        // 로직 구현 예시
        List<Card> cards = cardRepository.findAll();
        List<CardDetailDto> cardDetails = cards.stream()
                .map(card -> new CardDetailDto()
                .collect(Collectors.toList());
        CardListResponse response = new CardListResponse("Card list fetched successfully", cardDetails);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<CardDeleteResponse> CardDelete(long cardId) {
        return null;
    }

    @Override
    public ResponseEntity<CardCreateReponse> CardCreate(CardCreationRequestDto dto) {
        return null;
    }


}
