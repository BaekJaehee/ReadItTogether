package com.ssafy.rit.back.service;

import com.ssafy.rit.back.dto.postBox.requestDto.PostBoxCreationRequestDto;
import com.ssafy.rit.back.dto.postBox.response.PostBoxCreationResponse;
import com.ssafy.rit.back.dto.postBox.response.PostBoxListResponse;
import org.springframework.http.ResponseEntity;

public interface PostBoxService {
    ResponseEntity<PostBoxListResponse> readPostBoxList();

    ResponseEntity<PostBoxCreationResponse> createPostBox(PostBoxCreationRequestDto postBoxCreationRequestDto);
}
