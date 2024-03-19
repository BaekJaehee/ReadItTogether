package com.ssafy.rit.back.repository;

import com.ssafy.rit.back.entity.GuestBook;
import com.ssafy.rit.back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestBookRepository extends JpaRepository<GuestBook, Integer> {

}
