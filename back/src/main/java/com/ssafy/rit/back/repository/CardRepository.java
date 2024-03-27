package com.ssafy.rit.back.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.rit.back.entity.Card;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface CardRepository extends JpaRepository<Card,Long> {
    //생성

    // 우편함에서 카드 3개 가져와야 하는데, 아직 추천시스템 완성 안돼서 랜덤으로 가져오는거 넣어두겠습니다.
    @Query(value = "SELECT * FROM card ORDER BY RAND() LIMIT 3", nativeQuery = true)
    List<Card> findRandomCards();

    // 카드 ID로 카드 상세 정보 조회
    Optional<Card> findById(Long id);

    List<Card> findByToMemberId(Long toMemberId);




}
