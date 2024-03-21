package com.ssafy.rit.back.repository;

import com.ssafy.rit.back.entity.BookGenre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookGenreRepository extends JpaRepository<BookGenre, Integer> {
    List<BookGenre> findByBookId_Id(int bookId);
}
