package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.bookshelf.requestDto.BookshelfUpdateRequestDto;
import com.ssafy.rit.back.dto.bookshelf.requestDto.BookshelfUploadRequestDto;
import com.ssafy.rit.back.dto.bookshelf.response.BookshelfListResponse;
import com.ssafy.rit.back.dto.bookshelf.response.BookshelfUpdateResponse;
import com.ssafy.rit.back.dto.bookshelf.response.BookshelfUploadResponse;
import com.ssafy.rit.back.entity.Book;
import com.ssafy.rit.back.entity.Bookshelf;
import com.ssafy.rit.back.entity.Comment;
import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.exception.Book.BookNotFoundException;
import com.ssafy.rit.back.exception.Bookshelf.BookshelfException;
import com.ssafy.rit.back.repository.BookRepository;
import com.ssafy.rit.back.repository.BookshelfRepository;
import com.ssafy.rit.back.repository.CommentRepository;
import com.ssafy.rit.back.service.BookshelfService;
import com.ssafy.rit.back.util.CommonUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookshelfServiceImpl implements BookshelfService {

    private final CommonUtil commonUtil;
    private final BookRepository bookRepository;
    private final BookshelfRepository bookshelfRepository;
    private final CommentRepository commentRepository;

    @Override
    public ResponseEntity<BookshelfUploadResponse> uploadBookshelf(BookshelfUploadRequestDto dto) {

        // 책 id를 받으면 내 책장에 book 정보 저장해주기
        Member currentMember = commonUtil.getMember();

        Book currentBook = bookRepository.findById(dto.getBookId()).orElseThrow(BookNotFoundException::new);

        bookshelfRepository.findByBookIdAndMemberId(currentBook, currentMember).orElseThrow(BookshelfException::existException);

        Optional<Comment> commentOptional = commentRepository.findByBookIdAndMemberId(currentBook, currentMember);

        int isRate = commentOptional.isPresent() ? 1 : 0;

        // 유저가 매긴 평점 받아오기 : comment 목록에 접근해서 그 책에 리뷰를 남겼나 확인하고 남겼으면 거기에 평점 가져오고 안남겼으면 0을 받아오자
        int rating = commentOptional.map(Comment::getRating).orElse(0);

        Bookshelf bookshelf = Bookshelf.builder()
                .bookId(currentBook)
                .memberId(currentMember)
                .isRead(dto.getIsRead())
                .isRate(isRate)
                .rating(rating)
                .createdAt(LocalDate.now())
                .cover(currentBook.getCover())
                .build();

        bookshelfRepository.save(bookshelf);

        BookshelfUploadResponse response = new BookshelfUploadResponse("책 저장에 성공했습니다.", true);


        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @Override
    public ResponseEntity<BookshelfUpdateResponse> updateBookshelf(BookshelfUpdateRequestDto dto) {

        Member currentMember = commonUtil.getMember();

        Book currentBook = bookRepository.findById(dto.getBookId()).orElseThrow(BookNotFoundException::new);

        Bookshelf currentBookshelf = bookshelfRepository.findByBookIdAndMemberId(currentBook, currentMember).orElseThrow();

        int newIsRead = (currentBookshelf.getIsRead() == 1) ? 0 : 1;
        currentBookshelf.setIsRead(newIsRead);

        bookshelfRepository.save(currentBookshelf);

        BookshelfUpdateResponse response = new BookshelfUpdateResponse("읽은 책, 읽을 책 으로 이동 성공", true);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Override
    public ResponseEntity<BookshelfListResponse> readBookshelfList(Long memberId) {
        return null;
    }

}