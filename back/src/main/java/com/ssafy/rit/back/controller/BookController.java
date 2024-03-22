package com.ssafy.rit.back.controller;

import com.ssafy.rit.back.dto.book.requestDto.CommentCreationRequestDto;
import com.ssafy.rit.back.dto.book.requestDto.CommentUpdateRequestDto;
import com.ssafy.rit.back.dto.book.response.*;
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
    // 코멘트 조회
    @GetMapping("/comment/{bookId}")
    public ResponseEntity<CommentListResponse> readCommentList(@PathVariable("bookId") int bookId) {
        return bookService.readCommentList(bookId);
    }
    // 코멘트 수정
    @PatchMapping("/comment")
    public ResponseEntity<CommentUpdateResponse> updateComment(CommentUpdateRequestDto dto) {
        return bookService.updateComment(dto);
    }

    // 코멘트 삭제
    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<CommentDeleteResponse> deleteComment(@PathVariable("commentId") Long commentId) {
        return bookService.deleteComment(commentId);
    }


}
