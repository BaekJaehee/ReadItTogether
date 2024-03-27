package com.ssafy.rit.back.controller;

import com.ssafy.rit.back.dto.bookshelf.requestDto.BookshelfUpdateRequestDto;
import com.ssafy.rit.back.dto.bookshelf.requestDto.BookshelfUploadRequestDto;
import com.ssafy.rit.back.dto.bookshelf.response.BookshelfListResponse;
import com.ssafy.rit.back.dto.bookshelf.response.BookshelfUpdateResponse;
import com.ssafy.rit.back.dto.bookshelf.response.BookshelfUploadResponse;
import com.ssafy.rit.back.service.BookshelfService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookshelf")
@CrossOrigin("*")
@Slf4j
public class BookshelfController {

    private final BookshelfService bookshelfService;

    @PostMapping("/upload")
    public ResponseEntity<BookshelfUploadResponse> uploadBookshelf(@RequestBody BookshelfUploadRequestDto dto){
        return bookshelfService.uploadBookshelf(dto);
    }

    @PatchMapping("/update")
    public ResponseEntity<BookshelfUpdateResponse> updateBookshelf(@RequestBody BookshelfUpdateRequestDto dto) {
        return bookshelfService.updateBookshelf(dto);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<BookshelfListResponse> readBookshelfList(@PathVariable("memberId") Long memberId) {
        return bookshelfService.readBookshelfList(memberId);
    }
}
