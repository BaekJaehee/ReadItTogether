package com.ssafy.rit.back.controller;

import com.ssafy.rit.back.dto.guestBook.requestDto.GuestBookCreationRequestDto;
import com.ssafy.rit.back.dto.guestBook.response.GuestBookCreationResponse;
import com.ssafy.rit.back.service.GuestBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/guestbook")
@CrossOrigin("*")
public class GuestBookController {

    private final GuestBookService guestBookService;

    @PostMapping("/{toMemberId}")
    public ResponseEntity<GuestBookCreationResponse> createGuestBook(@PathVariable("toMemberId") Long toMemberId, @RequestBody GuestBookCreationRequestDto dto) {
        return guestBookService.createGuestBook(toMemberId, dto);
    }

}
