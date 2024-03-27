package com.ssafy.rit.back.repository;

import com.ssafy.rit.back.entity.Book;
import com.ssafy.rit.back.entity.Bookshelf;
import com.ssafy.rit.back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookshelfRepository extends JpaRepository <Bookshelf, Integer> {

    Optional<Bookshelf> findByBookIdAndMemberId(Book bookId, Member memberId);

}
