package com.ssafy.rit.back.service;

import com.ssafy.rit.back.dto.book.requestDto.CommentCreationRequestDto;
import com.ssafy.rit.back.dto.book.response.BookDetailResponse;
import com.ssafy.rit.back.dto.book.response.CommentCreationResponse;
import com.ssafy.rit.back.dto.book.response.CommentListResponse;
import org.springframework.http.ResponseEntity;


public interface BookService {

    ResponseEntity<BookDetailResponse> readBookDetail(int bookId);

    ResponseEntity<CommentCreationResponse> createComment(CommentCreationRequestDto dto);

    ResponseEntity<CommentListResponse> readCommentList(int bookId);
}
