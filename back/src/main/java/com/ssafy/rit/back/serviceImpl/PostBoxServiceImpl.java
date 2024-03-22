package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.postBox.response.PostBoxListResponse;
import com.ssafy.rit.back.dto.postBox.responseDto.PostBoxListResponseDto;
import com.ssafy.rit.back.dto.postBox.responseDto.ReceiveCardsDto;
import com.ssafy.rit.back.entity.Card;
import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.entity.Postbox;
import com.ssafy.rit.back.repository.CardRepository;
import com.ssafy.rit.back.repository.PostBoxRepository;
import com.ssafy.rit.back.service.PostBoxService;
import com.ssafy.rit.back.util.CommonUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostBoxServiceImpl implements PostBoxService {

    private static final int POSTBOX_CARD_LIMIT = 3;

    private final CardRepository cardRepository;
    private final CommonUtil commonUtil;
    private final PostBoxRepository postBoxRepository;

    // 우편함 조회 로직
    @Override
    public ResponseEntity<PostBoxListResponse> readPostBoxList() {

        Member currentMember = commonUtil.getMember();

        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));
        LocalDate endOfWeek = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY));

        List<Postbox> weeklyPostboxes = postBoxRepository.findAllByMemberIdAndCreationDateBetween(currentMember, startOfWeek, endOfWeek);

        // 이번주에 받은 우편이 없을 경우
        if (weeklyPostboxes.isEmpty()) {
            // TODO: Random 추천에서 추천 시스템 로직 적용으로 변경해야 합니다.
            List<Card> cards = cardRepository.findRandomCards();

            List<ReceiveCardsDto> cardsDto = convertCardsToDto(cards);
            createPostboxesForCurrentMember(cards, currentMember);

            PostBoxListResponse response = new PostBoxListResponse("카드 조회 성공", new PostBoxListResponseDto(cardsDto));

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        // 이번주에 받은 우편이 있을 경우
        else {
            List<ReceiveCardsDto> cardsDto = weeklyPostboxes.stream()
                    .map(this::convertPostboxToDto)
                    .collect(Collectors.toList());

            PostBoxListResponse response = new PostBoxListResponse("카드 조회 성공", new PostBoxListResponseDto(cardsDto));

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    private ReceiveCardsDto convertPostboxToDto(Postbox postbox) {
        Card card = postbox.getCardId();
        return ReceiveCardsDto.builder()
                .cover(card.getBookId().getCover())
                .cardId(card.getId())
                .build();
    }

    private List<ReceiveCardsDto> convertCardsToDto(List<Card> cards) {
        return cards.stream()
                .map(card -> ReceiveCardsDto.builder()
                        .cover(card.getBookId().getCover())
                        .cardId(card.getId())
                        .build())
                .collect(Collectors.toList());
    }

    private void createPostboxesForCurrentMember(List<Card> cards, Member currentMember) {
        cards.stream().limit(PostBoxServiceImpl.POSTBOX_CARD_LIMIT)
                .forEach(card -> {
                    Postbox newPostbox = Postbox.builder()
                            .createdAt(LocalDate.now())
                            .cardId(card)
                            .memberId(currentMember)
                            .build();
                    postBoxRepository.save(newPostbox);
                });
    }
}