package com.ssafy.rit.back.repository;

import com.ssafy.rit.back.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {

    Page<Book> findAll(Specification<Book> bookSpecification, Pageable pageable);

    @Query("SELECT b from Book b WHERE b.id IN :bookIds")
    List<Book> findAllByBookIds(@Param("bookIds") List<Integer> bookIds);
}
