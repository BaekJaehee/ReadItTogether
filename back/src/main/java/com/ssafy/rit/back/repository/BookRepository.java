package com.ssafy.rit.back.repository;

import com.ssafy.rit.back.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {

    Page<Book> findAll(Specification<Book> bookSpecification, Pageable pageable);
}
