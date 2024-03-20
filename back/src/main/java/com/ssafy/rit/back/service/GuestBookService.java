package com.ssafy.rit.back.service;

import com.ssafy.rit.back.dto.guestBook.requestDto.GuestBookCreationRequestDto;
import com.ssafy.rit.back.dto.guestBook.response.GuestBookCreationResponse;
import com.ssafy.rit.back.dto.guestBook.response.GuestBookDetailResponse;
import org.springframework.http.ResponseEntity;

public interface GuestBookService {

    ResponseEntity<GuestBookCreationResponse> createGuestBook(Long toMemberId, GuestBookCreationRequestDto dto);

    ResponseEntity<GuestBookDetailResponse> readGuestBookDetail(Long postId);
}
