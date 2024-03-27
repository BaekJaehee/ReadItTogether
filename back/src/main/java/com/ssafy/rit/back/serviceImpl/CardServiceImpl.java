package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.card.renspose.CardCreateReponse;
import com.ssafy.rit.back.dto.card.renspose.CardDeleteResponse;
import com.ssafy.rit.back.dto.card.renspose.CardDetailResponse;
import com.ssafy.rit.back.dto.card.renspose.CardListResponse;
import com.ssafy.rit.back.dto.card.requestDto.CardCreationRequestDto;
import com.ssafy.rit.back.dto.card.requestDto.CardDeleteRequestDto;
import com.ssafy.rit.back.dto.card.requestDto.CardDetailDto;
import com.ssafy.rit.back.dto.card.responseDto.CardDetailResponseDto;
import com.ssafy.rit.back.dto.card.responseDto.CardListResponseDto;
import com.ssafy.rit.back.entity.Book;
import com.ssafy.rit.back.entity.Card;
import com.ssafy.rit.back.repository.*;
import com.ssafy.rit.back.service.CardService;
import com.ssafy.rit.back.util.CommonUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.ssafy.rit.back.entity.Member;

import java.util.ArrayList;
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
        Member currentMember = commonUtil.getMember(); // 현재 로그인한 사용자 정보 가져오기

        List<Card> cards = cardRepository.findByToMemberId(currentMember.getId());
        
        List<CardListResponseDto> cardListResponseDtos = new ArrayList<>();
        for (Card card : cards) {
            CardListResponseDto cardListResponseDto = new CardListResponseDto(
                    card.getId(),
                    card.getBookId().getCover(), // 가정: Card 엔터티에 getBookId() 메서드가 있음
                    0 // isWrite는 비즈니스 로직에 따라 설정
            );
            cardListResponseDtos.add(cardListResponseDto);
        }
        // 최종 응답 생성 및 반환
        CardListResponse response = new CardListResponse("Card list fetched successfully", cardListResponseDtos);
        return ResponseEntity.ok(response);
    }



    @Override
    public ResponseEntity<CardDeleteResponse> CardDelete(CardDeleteRequestDto dto) {

        Member currentMember = commonUtil.getMember(); //현재유저 받아오기
        Card card = cardRepository.findById(dto.getCardId())  //card id를 받아와서 어떤 card인지 알아와서
                .orElseThrow(() -> new RuntimeException("Card not found"));
        if (!card.getToMemberId().getId().equals(currentMember.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new CardDeleteResponse("You do not have permission to delete this card.",true));
        }
        cardRepository.deleteById(dto.getCardId());

        return ResponseEntity.ok(new CardDeleteResponse("Card deleted successfully",true));
    }



    @Override
    public ResponseEntity<CardCreateReponse> CardCreate(CardCreationRequestDto dto) {
        return null;
    }



}
