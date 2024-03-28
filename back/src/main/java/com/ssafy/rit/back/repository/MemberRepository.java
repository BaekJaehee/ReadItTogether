package com.ssafy.rit.back.repository;

import com.ssafy.rit.back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Boolean existsByEmail(String email);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickname(String nickname);
    Optional<Member> findById(Long id);

    List<Member> findAllByShelfGroup(int shelfGroup);

    @Query(value = "SELECT * FROM member WHERE YEAR(CURDATE()) - YEAR(STR_TO_DATE(birth, '%Y')) BETWEEN ?1 AND ?2 AND gender = ?3", nativeQuery = true)
    List<Member> findMembersByAgeRangeAndGender(int minAge, int maxAge, int gender);


}
