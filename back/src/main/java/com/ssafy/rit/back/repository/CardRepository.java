package com.ssafy.rit.back.repository;
import com.ssafy.rit.back.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.rit.back.entity.Card;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CardRepository extends JpaRepository<Card,Long> {
    //생성

    // 우편함에서 카드 3개 가져와야 하는데, 아직 추천시스템 완성 안돼서 랜덤으로 가져오는거 넣어두겠습니다.
    @Query(value = "SELECT * FROM card ORDER BY RAND() LIMIT 3", nativeQuery = true)
    List<Card> findRandomCards();

    @Query("SELECT COUNT(c) FROM Card c WHERE c.fromMemberId.id = :fromMemberId")
    int getSendCardCnt(@Param("fromMemberId")Long fromMemberId);



    // 카드 ID로 카드 상세 정보 조회


    Page<Card> findByFromMemberId(Member fromMember, Pageable pageable);
    Page<Card> findByToMemberId(Member toMember, Pageable pageable);







}
