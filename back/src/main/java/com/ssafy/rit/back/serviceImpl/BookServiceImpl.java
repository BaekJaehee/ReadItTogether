package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.guestBook.response.BookDetailResponse;
import com.ssafy.rit.back.dto.guestBook.responseDto.BookDetailResponseDto;
import com.ssafy.rit.back.entity.Book;
import com.ssafy.rit.back.entity.BookGenre;
import com.ssafy.rit.back.entity.Genre;
import com.ssafy.rit.back.exception.Book.BookNotFoundException;
import com.ssafy.rit.back.repository.BookGenreRepository;
import com.ssafy.rit.back.repository.BookRepository;
import com.ssafy.rit.back.repository.GenreRepository;
import com.ssafy.rit.back.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final BookGenreRepository bookGenreRepository;
    private final GenreRepository genreRepository;
    private final ModelMapper modelMapper;

    @Override
    public ResponseEntity<BookDetailResponse> readBookDetail(int bookId) {
        log.info("(BookServiceImpl) 책 조회 서비스 시작");
        Book currentBook = bookRepository.findById(bookId).orElseThrow(BookNotFoundException::new);

        // 책 Id를 사용하여 BookGenre 중계테이블 접근 후 BookGenre 목록 조회
        List<BookGenre> bookGenres = bookGenreRepository.findByBookId_Id(bookId);

        // 조회된 BookGenre 목록에 GenreId 추출
        List<Integer> genreIds = bookGenres.stream()
                                            .map(bookGenre -> bookGenre.getGenreId().getId())
                                            .toList();
        log.info("(BookServiceImpl) 장르 아이디 목록 조회 {}", genreIds);

        // 장르 Id 목록을 사용해서 장르 category 목록을 조회
        List<String> categories = genreRepository.findAllById(genreIds).stream()
                                                .map(Genre::getCategory)
                                                .toList();

        // 가져온 정보들을 dto클래스에 매핑 시켜줍니다.
        BookDetailResponseDto detailDto = modelMapper.map(currentBook, BookDetailResponseDto.class);
        detailDto.setGenres(categories);

        BookDetailResponse response = new BookDetailResponse("책 정보 조회 성공", detailDto);
        log.info("(BookServiceImpl) 책 조회 결과 {}", response);
        log.info("(BookServiceImpl) 책 조회 서비스 끝");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
