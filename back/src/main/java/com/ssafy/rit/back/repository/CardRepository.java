package com.ssafy.rit.back.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.rit.back.entity.Card;


public interface CardRepository extends JpaRepository<Card,Long> {
    //생성

}
