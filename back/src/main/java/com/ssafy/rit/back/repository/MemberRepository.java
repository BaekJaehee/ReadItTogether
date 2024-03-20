package com.ssafy.rit.back.repository;

import com.ssafy.rit.back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Boolean existsByEmail(String email);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickname(String nickname);

}
