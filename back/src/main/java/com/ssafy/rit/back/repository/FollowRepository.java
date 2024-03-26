package com.ssafy.rit.back.repository;

import com.ssafy.rit.back.entity.Follow;
import com.ssafy.rit.back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Integer> {

    @Query("select f from Follow f where f.followingMember = :following and f.followerMember = :follower")
    Optional<Follow> findFollow(@Param("following") Member following, @Param("follower") Member follower);

    List<Follow> findByFollowingMember(Member followingMember);
    List<Follow> findByFollowerMember(Member followerMember);

}
