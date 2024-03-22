package com.ssafy.rit.back.dto.recommend.response;

import com.ssafy.rit.back.dto.recommend.responseDto.RecommendListResponseDto;
import lombok.Data;

@Data
public class RecommendListResponse {

    private String message;
    private RecommendListResponseDto data;
}
