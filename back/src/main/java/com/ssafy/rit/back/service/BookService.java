package com.ssafy.rit.back.service;

import com.ssafy.rit.back.dto.guestBook.response.BookDetailResponse;
import org.springframework.http.ResponseEntity;


public interface BookService {

    ResponseEntity<BookDetailResponse> readBookDetail(int bookId);

}
