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

        Book book = card.getBookId(); // Card 엔터티로부터 Book 엔터티 참조

        // CardDetailResponseDto에 카드와 책의 정보를 설정
        CardDetailDto responseDto = new CardDetailDto();
        responseDto.setId(cardId);
        responseDto.setComment(card.getComment());

        // Book 엔터티가 null이 아닐 경우에만 bookCover 설정
        if (book != null) {
            responseDto.setBookCover(book.getCover());
        }

        // CardDetailResponse 생성 및 반환
        CardDetailResponse response = new CardDetailResponse("Success", responseDto);
        return ResponseEntity.ok(response);
    }


    @Override
    public ResponseEntity<CardListResponse> CardList() {
        return null;
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
