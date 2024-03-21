package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.postBox.response.PostBoxListResponse;
import com.ssafy.rit.back.dto.postBox.responseDto.PostBoxListResponseDto;
import com.ssafy.rit.back.dto.postBox.responseDto.ReceiveCardsDto;
import com.ssafy.rit.back.entity.Card;
import com.ssafy.rit.back.repository.CardRepository;
import com.ssafy.rit.back.service.PostBoxService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostBoxServiceImpl implements PostBoxService {

    private final CardRepository cardRepository;

    @Override
    public ResponseEntity<PostBoxListResponse> readPostBoxList() {

        List<Card> cards = cardRepository.findRandomCards();

        List<ReceiveCardsDto> cardDtos = cards.stream()
                .map(card -> ReceiveCardsDto.builder()
                        .cover(card.getBookId().getCover())
                        .cardId(card.getId())
                        .build())
                .collect(Collectors.toList());

        PostBoxListResponseDto detailDto = new PostBoxListResponseDto(cardDtos);

        PostBoxListResponse response = new PostBoxListResponse("카드 조회 성공", detailDto);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
