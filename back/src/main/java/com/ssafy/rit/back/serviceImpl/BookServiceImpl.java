package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.guestBook.response.BookDetailResponse;
import com.ssafy.rit.back.dto.guestBook.responseDto.BookDetailResponseDto;
import com.ssafy.rit.back.entity.Book;
import com.ssafy.rit.back.exception.Book.BookNotFoundException;
import com.ssafy.rit.back.repository.BookRepository;
import com.ssafy.rit.back.service.BookService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final ModelMapper modelMapper;

    @Override
    public ResponseEntity<BookDetailResponse> readBookDetail(int bookId) {

        Book currentBook = bookRepository.findById(bookId).orElseThrow(BookNotFoundException::new);

        BookDetailResponseDto detailDto = modelMapper.map(currentBook, BookDetailResponseDto.class);

        BookDetailResponse response = new BookDetailResponse("책 정보 조회 성공", detailDto);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
