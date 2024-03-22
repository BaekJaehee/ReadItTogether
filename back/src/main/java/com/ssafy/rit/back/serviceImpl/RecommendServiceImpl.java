package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.recommend.response.RecommendListResponse;
import com.ssafy.rit.back.service.RecommendService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RecommendServiceImpl implements RecommendService {
    @Override
    public ResponseEntity<RecommendListResponse> readRecommendList(Long memberId, int group) {
        return null;
    }
}
