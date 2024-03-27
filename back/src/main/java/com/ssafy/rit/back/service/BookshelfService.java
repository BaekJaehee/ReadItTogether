package com.ssafy.rit.back.service;

import com.ssafy.rit.back.dto.bookshelf.requestDto.BookshelfUpdateRequestDto;
import com.ssafy.rit.back.dto.bookshelf.requestDto.BookshelfUploadRequestDto;
import com.ssafy.rit.back.dto.bookshelf.response.BookshelfListResponse;
import com.ssafy.rit.back.dto.bookshelf.response.BookshelfUpdateResponse;
import com.ssafy.rit.back.dto.bookshelf.response.BookshelfUploadResponse;
import org.springframework.http.ResponseEntity;

public interface BookshelfService {
    ResponseEntity<BookshelfUploadResponse> uploadBookshelf(BookshelfUploadRequestDto dto);

    ResponseEntity<BookshelfUpdateResponse> updateBookshelf(BookshelfUpdateRequestDto dto);

    ResponseEntity<BookshelfListResponse> readBookshelfList(Long memberId);
}
