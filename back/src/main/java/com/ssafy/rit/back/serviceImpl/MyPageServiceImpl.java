package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.member.responseDto.FollowMemberResponseDto;
import com.ssafy.rit.back.dto.member.responseDto.MyPageResponseDto;
import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.service.MyPageService;
import com.ssafy.rit.back.util.CommonUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
public class MyPageServiceImpl implements MyPageService {

    private CommonUtil commonUtil;
    private FollowServiceImpl followService;

    public MyPageServiceImpl(CommonUtil commonUtil, FollowServiceImpl followService) {
        this.commonUtil = commonUtil;
        this.followService = followService;
    }


    @Override
    public int getEvaluatedBookCnt() {
        return 0;
    }

    @Override
    public int getLikedBookCnt() {
        return 0;
    }

    @Override
    public int getSendCardCnt() {
        return 0;
    }

    @Override
    public List<Long> getGenreNoList() {
        return null;
    }

    public MyPageResponseDto getMyPage() {

        Member member = commonUtil.getMember();

        log.info("----------------------------------------------------------------------");
        log.info("------------------------{}님의 마이페이지------------------------", member.getNickname());
        log.info("----------------------------------------------------------------------");

        List<Member> followList = followService.getFollowingList(member);
        List<Member> followerList = followService.getFollowerList(member);

        List<FollowMemberResponseDto> followDto = new ArrayList<>();
        List<FollowMemberResponseDto> followerDto = new ArrayList<>();

        log.info(followList);


        MyPageResponseDto responseDto = MyPageResponseDto.builder()
                .profileImage(member.getProfileImage())
                .nickname(member.getNickname())
                .email(member.getEmail())

                .build();
        return responseDto;
    }


    private List<FollowMemberResponseDto> makeFollowListResponseDto(List<Member> followList) {

//        FollowMemberResponseDto followMemberResponseDto = new FollowMemberResponseDto();

        return null;
    }
}
