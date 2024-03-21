package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.book.requestDto.CommentCreationRequestDto;
import com.ssafy.rit.back.dto.book.response.BookDetailResponse;
import com.ssafy.rit.back.dto.book.response.CommentListResponse;
import com.ssafy.rit.back.dto.book.responseDto.BookDetailResponseDto;
import com.ssafy.rit.back.dto.book.response.CommentCreationResponse;
import com.ssafy.rit.back.dto.book.responseDto.CommentListResponseDto;
import com.ssafy.rit.back.entity.*;
import com.ssafy.rit.back.exception.Book.BookNotFoundException;
import com.ssafy.rit.back.exception.Book.CommentException;
import com.ssafy.rit.back.repository.BookGenreRepository;
import com.ssafy.rit.back.repository.BookRepository;
import com.ssafy.rit.back.repository.CommentRepository;
import com.ssafy.rit.back.repository.GenreRepository;
import com.ssafy.rit.back.service.BookService;
import com.ssafy.rit.back.util.CommonUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookServiceImpl implements BookService {
    // 레파지토리
    private final BookRepository bookRepository;
    private final BookGenreRepository bookGenreRepository;
    private final CommentRepository commentRepository;
    private final GenreRepository genreRepository;
    // 기타
    private final ModelMapper modelMapper;
    private final CommonUtil commonUtil;

    @Override
    public ResponseEntity<BookDetailResponse> readBookDetail(int bookId) {

        Book currentBook = bookRepository.findById(bookId).orElseThrow(BookNotFoundException::new);

        // 책 Id를 사용하여 BookGenre 중계테이블 접근 후 BookGenre 목록 조회
        List<BookGenre> bookGenres = bookGenreRepository.findByBookId_Id(bookId);

        // 조회된 BookGenre 목록에 GenreId 추출
        List<Integer> genreIds = bookGenres.stream()
                                            .map(bookGenre -> bookGenre.getGenreId().getId())
                                            .toList();

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

    @Override
    public ResponseEntity<CommentCreationResponse> createComment(CommentCreationRequestDto dto) {

        // 유저 정보 유효성 확인
        Member currentMember = commonUtil.getMember();

        // 책이 있는지 확인
        Book book = bookRepository.findById(dto.getBookId())
                .orElseThrow(BookNotFoundException::new);

        // 평점 안줬을 때
        if (dto.getRating() < 1) {
            throw CommentException.ratingException();
        }

        // 댓글 작성 안하거나 길이가 넘을 때
        if (dto.getComment().isEmpty() || dto.getComment().length() > 200) {
            throw CommentException.commentLengthException();
        }

        Comment newComment = Comment.builder()
                .bookId(book)
                .comment(dto.getComment())
                .rating(dto.getRating())
                .createdAt(LocalDate.now())
                .memberId(currentMember)
                .build();

        commentRepository.save(newComment);

        CommentCreationResponse response = new CommentCreationResponse("책 코멘트 등록이 완료 되었습니다.", true);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Override
    public ResponseEntity<CommentListResponse> readCommentList(int bookId) {

        // 책이 있는지 확인
        Book book = bookRepository.findById(bookId)
                .orElseThrow(BookNotFoundException::new);

        List<Comment> comments = commentRepository.findByBookId(book);

        List<CommentListResponseDto> commentListResponseDtos = comments.stream()
                .map(comment -> {
                    Member member = comment.getMemberId();
                    String nickname = member != null ? member.getNickname() : "익명";

                    // 빌더 패턴을 사용하여 객체 생성
                    return CommentListResponseDto.builder()
                            .nickname(nickname)
                            .rating(comment.getRating())
                            .comment(comment.getComment())
                            .createAt(comment.getCreatedAt())
                            .build();
                }).toList();

        CommentListResponse response = CommentListResponse.builder()
                .message("코멘트 조회 완료")
                .comments(commentListResponseDtos)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
