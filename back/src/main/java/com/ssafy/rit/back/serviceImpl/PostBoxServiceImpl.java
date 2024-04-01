package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.postBox.requestDto.PostBoxToCardCreationRequestDto;
import com.ssafy.rit.back.dto.postBox.response.PostBoxToCardCreationResponse;
import com.ssafy.rit.back.dto.postBox.response.PostBoxListResponse;
import com.ssafy.rit.back.dto.postBox.responseDto.PostBoxListResponseDto;
import com.ssafy.rit.back.dto.postBox.responseDto.ReceiveCardsDto;
import com.ssafy.rit.back.entity.Card;
import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.entity.Postbox;
import com.ssafy.rit.back.exception.card.CardNotFoundException;
import com.ssafy.rit.back.exception.postBox.PostBoxCantOpenException;
import com.ssafy.rit.back.repository.CardRepository;
import com.ssafy.rit.back.repository.MemberRepository;
import com.ssafy.rit.back.repository.PostBoxRepository;
import com.ssafy.rit.back.service.PostBoxService;
import com.ssafy.rit.back.util.CommonUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostBoxServiceImpl implements PostBoxService {

    private static final int POSTBOX_CARD_LIMIT = 3;

    private final CardRepository cardRepository;
    private final CommonUtil commonUtil;
    private final PostBoxRepository postBoxRepository;
    private final MemberRepository memberRepository;

    // 우편함 조회 로직
    @Override
    public ResponseEntity<PostBoxListResponse> readPostBoxList() {

        Member currentMember = commonUtil.getMember();

        if (currentMember.getIsReceivable() == 0) {
            throw new PostBoxCantOpenException();
        }

        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));
        LocalDate endOfWeek = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY));

        List<Postbox> weeklyPostboxes = postBoxRepository.findAllByMemberIdAndCreationDateBetween(currentMember, startOfWeek, endOfWeek);

        if (weeklyPostboxes.isEmpty()) {
            List<Card> cards = cardRepository.findRandomCardsExcludingMember(currentMember.getId());
            List<Member> allByShelfGroup = memberRepository.findAllByShelfGroup(currentMember.getShelfGroup());
            List<Card> byFromMemberIdIn = cardRepository.findByFromMemberIdInAndToMemberIdNot(allByShelfGroup, currentMember);

            if (!byFromMemberIdIn.isEmpty()) {
                Collections.shuffle(byFromMemberIdIn);
                Card randomCardFromThisWeek = byFromMemberIdIn.get(0);
                cards.set(0, randomCardFromThisWeek);
            }

            List<Card> thisWeekCards = cardRepository.findCardsBetweenDates(startOfWeek, endOfWeek, currentMember);
            if (!thisWeekCards.isEmpty()) {
                Collections.shuffle(thisWeekCards);
                Card randomCardFromThisWeek = thisWeekCards.get(0);
                cards.set(1, randomCardFromThisWeek);
            }

            List<ReceiveCardsDto> cardsDto = convertCardsToDto(cards);
            createPostboxesForCurrentMember(cards, currentMember);

            PostBoxListResponse response = new PostBoxListResponse("카드 조회 성공", new PostBoxListResponseDto(cardsDto));

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        else {
            List<ReceiveCardsDto> cardsDto = weeklyPostboxes.stream()
                    .map(this::convertPostboxToDto)
                    .collect(Collectors.toList());

            PostBoxListResponse response = new PostBoxListResponse("카드 조회 성공", new PostBoxListResponseDto(cardsDto));

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    // 우편함에 있는 카드를 내 다이어리에 저장
    @Override
    @Transactional
    public ResponseEntity<PostBoxToCardCreationResponse> createPostBoxToCard(PostBoxToCardCreationRequestDto postBoxToCardCreationRequestDto) {

        Member currentMember = commonUtil.getMember();

        Card currentCard = cardRepository.findById(postBoxToCardCreationRequestDto.getCardId())
                .orElseThrow(CardNotFoundException::new);

        Card saveCard = Card.builder()
                .comment(currentCard.getComment())
                .createdAt(LocalDate.now())
                .fromMemberId(currentCard.getFromMemberId())
                .toMemberId(currentMember)
                .bookId(currentCard.getBookId())
                .build();

        cardRepository.save(saveCard);
        currentMember.setIsReceivable(0);

        PostBoxToCardCreationResponse response = new PostBoxToCardCreationResponse("다이어리에 카드가 저장되었습니다.", true);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
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
