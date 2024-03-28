package com.ssafy.rit.back.repository;

import com.ssafy.rit.back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Boolean existsByEmail(String email);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickname(String nickname);
    Optional<Member> findById(Long id);

    //랜덤유저에게 카드전송할때필요
    @Query(value = "SELECT * FROM member ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Member findRandomMember();

}
