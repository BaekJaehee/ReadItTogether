package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.book.requestDto.CommentCreationRequestDto;
import com.ssafy.rit.back.dto.book.requestDto.CommentUpdateRequestDto;
import com.ssafy.rit.back.dto.book.response.*;
import com.ssafy.rit.back.dto.book.responseDto.BookDetailResponseDto;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;


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

    // 책 상세 조회
    @Override
    public ResponseEntity<BookDetailResponse> readBookDetail(int bookId, int page, int size) {

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

        // ------------------------ 댓글 넣기 -----------------------------------
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<Comment> commentPage = commentRepository.findByBookId(currentBook, pageable);

        List<CommentListResponseDto> commentListResponseDtos = commentPage.stream()
                .map(comment -> {
                    Member member = comment.getMemberId();
                    String nickname = member.getNickname();


                    return CommentListResponseDto.builder()
                            .nickname(nickname)
                            .rating(comment.getRating())
                            .comment(comment.getComment())
                            .createAt(comment.getCreatedAt())
                            .profileImage(member.getProfileImage())
                            .memberId(member.getId())
                            .commentId(comment.getId())
                            .build();
                }).toList();
        // ---------------------- 댓글 넣기 ----------------------------------

        // 가져온 정보들을 dto클래스에 매핑 시켜줍니다.
        BookDetailResponseDto detailDto = modelMapper.map(currentBook, BookDetailResponseDto.class);
        detailDto.setGenres(categories);
        detailDto.setCommentListResponseDtos(commentListResponseDtos);


        BookDetailResponse response = new BookDetailResponse("책 정보 조회 성공", detailDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 댓글 작성
    @Override
    @Transactional
    public ResponseEntity<CommentCreationResponse> createComment(CommentCreationRequestDto dto) {

        // 유저 정보 유효성 확인
        Member currentMember = commonUtil.getMember();

        // 책이 있는지 확인과 동시에 book에 정보 저장
        Book currentBook = bookRepository.findById(dto.getBookId())
                .orElseThrow(BookNotFoundException::new);

        // 이미 작성된 코멘트가 있을 때
        if (commentRepository.findByBookIdAndMemberId(currentBook, currentMember).isPresent()){
            throw CommentException.commentExistException();
        };

        // 평점 안줬을 때
        if (dto.getRating() < 1) {
            throw CommentException.ratingException();
        }

        // 댓글 작성 안하거나 길이가 넘을 때
        if (dto.getComment() == null || dto.getComment().isEmpty() || dto.getComment().length() > 200) {
            throw CommentException.commentLengthException();
        }


        Comment newComment = Comment.builder()
                .bookId(currentBook)
                .comment(dto.getComment())
                .rating(dto.getRating())
                .createdAt(LocalDate.now())
                .memberId(currentMember)
                .build();

        currentBook.setRating(
                ((currentBook.getRating() * currentBook.getComments().size()) + dto.getRating()) / (currentBook.getComments().size() + 1)
                );
        currentBook.setReviewerCnt(currentBook.getReviewerCnt() + 1);

        commentRepository.save(newComment);

        CommentCreationResponse response = new CommentCreationResponse("책 코멘트 등록이 완료 되었습니다.", true);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    // 코멘트 조회
//    @Override
//    public ResponseEntity<CommentListResponse> readCommentList(int bookId, int page, int size) {
//
//        // 책이 있는지 확인
//        Book currentBook = bookRepository.findById(bookId)
//                .orElseThrow(BookNotFoundException::new);
//
//        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
//        Page<Comment> commentPage = commentRepository.findByBookId(currentBook, pageable);
//
//
//        List<CommentListResponseDto> commentListResponseDtos = commentPage.stream()
//                .map(comment -> {
//                    Member member = comment.getMemberId();
//                    String nickname = member.getNickname();
//
//                    return CommentListResponseDto.builder()
//                            .nickname(nickname)
//                            .rating(comment.getRating())
//                            .comment(comment.getComment())
//                            .createAt(comment.getCreatedAt())
//                            .build();
//                }).toList();
//
//        CommentListResponse response = CommentListResponse.builder()
//                .message("코멘트 조회 완료")
//                .comments(commentListResponseDtos)
//                .build();
//
//        return ResponseEntity.status(HttpStatus.OK).body(response);
//    }

    // 코멘트 수정
    @Override
    public ResponseEntity<CommentUpdateResponse> updateComment(CommentUpdateRequestDto dto) {

        Member currentMember = commonUtil.getMember();

        // 대상 코멘트가 있는지 확인 및 수정
        Comment comment = commentRepository.findById(dto.getCommentId())
                .orElseThrow(CommentException::commentNotFoundException);

        // 코멘트 주인과 접속 유저가 같은지 확인
        if (!Objects.equals(comment.getMemberId().getId(), currentMember.getId())) {
            throw CommentException.memberNotEqualException();
        }

        // 코멘트 내용이 비어있거나 길이가 맞는지 검사
        if (dto.getComment() == null || dto.getComment().isEmpty() || dto.getComment().length() > 200) {
            throw CommentException.commentLengthException();
        }

        Book currentBook = bookRepository.findById(dto.getBookId()).orElseThrow(BookNotFoundException::new);

        // 평점 갱신 : ( (현재 평균점수 x 댓글 갯수) - 원래 평점 + 바꾼 평점 ) / 댓글 갯수
        currentBook.setRating(
                ((currentBook.getRating() * currentBook.getComments().size()) - comment.getRating() + dto.getRating()) / (currentBook.getComments().size())
        );

        // 코멘트 내용 및 평점 업데이트
        comment.setComment(dto.getComment());
        comment.setRating(dto.getRating());
        comment.setCreatedAt(LocalDate.now()); // 업데이트된 날짜 설정, 필드가 존재한다면

        // 수정된 코멘트 저장
        commentRepository.save(comment);

        // 성공 메세지 주기
        CommentUpdateResponse response = CommentUpdateResponse.builder()
                .message("코멘트 수정 성공")
                .data(true)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 코멘트 삭제
    @Override
    public ResponseEntity<CommentDeleteResponse> deleteComment(Long commentId) {

        // 접속 유저 체크
        Member currentMember = commonUtil.getMember();

        // 대상 코멘트가 있는지 확인 및 수정
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(CommentException::commentNotFoundException);

        // 코멘트 주인과 접속 유저가 같은지 확인
        if (!Objects.equals(comment.getMemberId().getId(), currentMember.getId())) {
            throw CommentException.memberNotEqualException();
        }

        // comment entity 에 저장되어있는 BookId는 사실 Book 전체 정보이다 (추후에 객체 이름 수정 필요)
        Book currentBook = comment.getBookId();

        // 댓글 갯수 및 평점 갱신
        currentBook.setReviewerCnt(currentBook.getReviewerCnt() - 1);

        if (currentBook.getReviewerCnt() == 0) {
            currentBook.setRating(0);
        } else {
        currentBook.setRating(
                ((currentBook.getRating() * currentBook.getComments().size()) - comment.getRating()) / (currentBook.getComments().size())
            );
        }

        // 삭제
        commentRepository.delete(comment);

        CommentDeleteResponse response = CommentDeleteResponse.builder()
                .message("코멘트 삭제 성공")
                .data(true)
                .build();

        bookRepository.save(currentBook);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


}
