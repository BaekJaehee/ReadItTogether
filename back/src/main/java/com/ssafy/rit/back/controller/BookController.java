package com.ssafy.rit.back.controller;

import com.ssafy.rit.back.dto.book.requestDto.CommentCreationRequestDto;
import com.ssafy.rit.back.dto.book.response.BookDetailResponse;
import com.ssafy.rit.back.dto.book.response.CommentCreationResponse;
import com.ssafy.rit.back.dto.book.response.CommentListResponse;
import com.ssafy.rit.back.service.BookService;
import lombok.RequiredArgsConstructor;
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

    // 책 상세 보기
    @GetMapping("/{bookId}")
    public ResponseEntity<BookDetailResponse> readBookDetail(@PathVariable("bookId") int bookId) {
        return bookService.readBookDetail(bookId);
    }


    // 코멘트(리뷰) 관련 CRUD
    // 코메트 작성
    @PostMapping("/comment")
    public ResponseEntity<CommentCreationResponse> createComment(@RequestBody CommentCreationRequestDto dto){
        return bookService.createComment(dto);

    }

    @GetMapping("/comment/{bookId}")
    public ResponseEntity<CommentListResponse> readCommentList(@PathVariable("bookId") int bookId) {
        return bookService.readCommentList(bookId);
    }

}
