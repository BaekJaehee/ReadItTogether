package com.ssafy.rit.back.service;

import com.ssafy.rit.back.dto.book.requestDto.CommentCreationRequestDto;
import com.ssafy.rit.back.dto.book.requestDto.CommentUpdateRequestDto;
import com.ssafy.rit.back.dto.book.response.*;
import org.springframework.http.ResponseEntity;


public interface BookService {

    ResponseEntity<BookDetailResponse> readBookDetail(int bookId);

    ResponseEntity<CommentCreationResponse> createComment(CommentCreationRequestDto dto);

    ResponseEntity<CommentListResponse> readCommentList(int bookId);

    ResponseEntity<CommentUpdateResponse> updateComment(CommentUpdateRequestDto dto);

    ResponseEntity<CommentDeleteResponse> deleteComment(Long commentId);
}
