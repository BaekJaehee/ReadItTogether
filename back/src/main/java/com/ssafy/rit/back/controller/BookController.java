package com.ssafy.rit.back.controller;

import com.ssafy.rit.back.dto.guestBook.response.BookDetailResponse;
import com.ssafy.rit.back.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/books")
@CrossOrigin("*")
@Slf4j
public class BookController {

    private final BookService bookService;

    @GetMapping("/{bookId}")
    public ResponseEntity<BookDetailResponse> readBookDetail(@PathVariable("bookId") int bookId) {
        log.info("(BookController) 책 조회 시작");
        return bookService.readBookDetail(bookId);
    }
}
