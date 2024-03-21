package com.ssafy.rit.back.repository;

import com.ssafy.rit.back.entity.Book;
import com.ssafy.rit.back.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByBookId(Book book);
}
