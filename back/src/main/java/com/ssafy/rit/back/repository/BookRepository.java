package com.ssafy.rit.back.repository;

import com.ssafy.rit.back.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {

}
