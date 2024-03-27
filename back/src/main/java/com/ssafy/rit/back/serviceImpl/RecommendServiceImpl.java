package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.recommend.response.RecommendListResponse;
import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.service.RecommendService;
import com.ssafy.rit.back.util.CommonUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecommendServiceImpl implements RecommendService {

    private final CommonUtil commonUtil;

    @Override
    public ResponseEntity<RecommendListResponse> readRecommendList(int group) {
        Member currentMember = commonUtil.getMember();

        // TODO: 현재 유저 나이대 및 성별 조회 -> 해당 그룹 추천 리스트 가져오기

        // TODO: 현재 유저 개인 추천 리스트 조회 -> 개인 추천 리스트 가져오기

        // TODO: 현재 유저 콘텐츠 기반 그룹 추천 리스트 조회 -> 해당 그룹 추천 리스트 가져오기

        // TODO: 현재 인기 리스트 가져오기

        return null;
    }
}
