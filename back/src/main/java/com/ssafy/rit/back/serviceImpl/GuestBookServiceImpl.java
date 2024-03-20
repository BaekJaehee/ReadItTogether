package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.guestBook.requestDto.GuestBookCreationRequestDto;
import com.ssafy.rit.back.dto.guestBook.response.GuestBookCreationResponse;
import com.ssafy.rit.back.entity.GuestBook;
import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.exception.member.MemberNotFoundException;
import com.ssafy.rit.back.repository.GuestBookRepository;
import com.ssafy.rit.back.repository.MemberRepository;
import com.ssafy.rit.back.service.GuestBookService;
import com.ssafy.rit.back.util.CommonUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class GuestBookServiceImpl implements GuestBookService {

    private final GuestBookRepository guestBookRepository;
    private final MemberRepository memberRepository;
    private final CommonUtil commonUtil;

    @Override
    public ResponseEntity<GuestBookCreationResponse> createGuestBook(Long toMemberId, GuestBookCreationRequestDto dto) {

        Member currentUser = commonUtil.getMember();

        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new MemberNotFoundException("해당 유저는 존재하지 않습니다."));

        GuestBook newGuestBook = GuestBook.builder()
                .toMemberId(toMember)
                .fromMemberId(currentUser)
                .content(dto.getContent())
                .createdAt(LocalDate.now())
                .build();

        guestBookRepository.save(newGuestBook);

        GuestBookCreationResponse response = GuestBookCreationResponse.createGuestBookCreationResponse(
                "방명록 작성 성공",
                true
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
