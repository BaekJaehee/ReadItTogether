package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.card.renspose.CardCreateResponse;
import com.ssafy.rit.back.dto.card.renspose.CardDeleteResponse;
import com.ssafy.rit.back.dto.card.renspose.CardDetailResponse;
import com.ssafy.rit.back.dto.card.renspose.CardListResponse;
import com.ssafy.rit.back.dto.card.requestDto.CardCreateRequestDto;
import com.ssafy.rit.back.dto.card.requestDto.CardRequestDto;
import com.ssafy.rit.back.dto.card.responseDto.CardDetailResponseDto;
import com.ssafy.rit.back.dto.card.responseDto.CardListResponseDto;
import com.ssafy.rit.back.entity.Book;
import com.ssafy.rit.back.entity.Card;
import com.ssafy.rit.back.entity.Postbox;
import com.ssafy.rit.back.repository.*;
import com.ssafy.rit.back.service.CardService;
import com.ssafy.rit.back.util.CommonUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.ssafy.rit.back.entity.Member;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Service
@RequiredArgsConstructor
@Slf4j
public class CardServiceImpl implements CardService {

    private final BookRepository bookRepository;
    private final CommonUtil commonUtil;
    private final CardRepository cardRepository;




    @Override
    public ResponseEntity<CardDetailResponse> CardDetail(long cardId) {

        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("카드가 없는것같음"));

        // 카드<---->책
        Book book = card.getBookId();
        if (book == null) {
            throw new RuntimeException("북이 존재하지않는데..흠");
        }

        // 카드 상세 정보를 담을 DTO 생성
        CardDetailResponseDto responseDto = CardDetailResponseDto.builder()
                .content(book.getInfo())
                .comment(card.getComment())
                .title(book.getTitle())
                .cover(book.getCover())
                .author(book.getAuthor())
                .build();

        // 최종 응답 객체 생성
        CardDetailResponse response = new CardDetailResponse("Success", responseDto);

        return ResponseEntity.ok(response);
    }


    @Override
    public ResponseEntity<CardListResponse> CardList() {
        Member currentMember = commonUtil.getMember(); // 현재 로그인한 사용자 정보 가져오기

        // 현재 사용자가 보낸 카드 목록 조회 (isWrite = 0)
        List<CardListResponseDto> sentCardDtos = cardRepository.findByFromMemberId(currentMember).stream()
                .map(card -> new CardListResponseDto(card.getId(), card.getBookId().getCover(), 0))
                .toList();

        // 현재 사용자가 받은 카드 목록 조회 (isWrite = 1)
        List<CardListResponseDto> receivedCardDtos = cardRepository.findByToMemberId(currentMember).stream()
                .map(card -> new CardListResponseDto(card.getId(), card.getBookId().getCover(), 1))
                .toList();

        // 두 리스트를 결합
        List<CardListResponseDto> allCardDtos = Stream.concat(sentCardDtos.stream(), receivedCardDtos.stream())
                .collect(Collectors.toList());


        CardListResponse response = CardListResponse.builder()
                .message("Card list 입니다요")
                .data(allCardDtos)
                .build();

        return ResponseEntity.ok(response);
    }




    @Override
    public ResponseEntity<CardDeleteResponse> CardDelete(CardRequestDto dto) {
        Member currentMember = commonUtil.getMember(); // 현재 로그인한 사용자 정보 가져오기
        Card card = cardRepository.findById(dto.getCardId()) // 카드 ID로 카드 조회
                .orElseThrow(() -> new RuntimeException("Card not found"));

        // 현재 사용자가 카드의 보낸 사람인지 확인
        boolean isCurrentUserTheSender = card.getFromMemberId() != null && card.getFromMemberId().equals(currentMember);
        // 현재 사용자가 카드의 받는 사람인지 확인
        boolean isCurrentUserTheRecipient = card.getToMemberId() != null && card.getToMemberId().equals(currentMember);

        if (!isCurrentUserTheSender && !isCurrentUserTheRecipient) {
            // 현재 사용자가 카드의 보낸 사람도, 받는 사람도 아닐 경우
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new CardDeleteResponse("넌 이걸 삭제할 자격이없스요.", false));
        }

        // 현재 사용자가 보낸 카드일 경우, fromMemberId 관계를 제거
        if (isCurrentUserTheSender) {
            card.setFromMemberId(null);
        }

        // 현재 사용자가 받은 카드일 경우, toMemberId 관계를 제거
        if (isCurrentUserTheRecipient) {
            card.setToMemberId(null);
        }

        cardRepository.save(card); // 변경 사항 저장

        return ResponseEntity.ok(new CardDeleteResponse("카드삭제 .", true));
    }





    @Override
    public ResponseEntity<CardCreateResponse> CardCreate(CardCreateRequestDto dto) {
        // bookId를 통해서 책 정보 가져오기
        Book book = bookRepository.findById((int) dto.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));

        // 현재 로그인한 사용자 정보 가져오기
        Member sender = commonUtil.getMember();

        // 카드 생성 및 저장
        Card card = new Card();
        card.setComment(dto.getComment()); // 사용자가 입력한 코멘트
        card.setBookId(book); // 책 선택
        card.setFromMemberId(sender); // 현재 사용자
        // 랜덤한 수신자 설정 로직 삭제
        cardRepository.save(card);


        // 성공 응답 반환
        CardCreateResponse response = new CardCreateResponse("Card successfully sent", true);
        return ResponseEntity.ok(response);
    }





}
