package com.ssafy.rit.back.controller;

import com.ssafy.rit.back.dto.postBox.requestDto.PostBoxCreationRequestDto;
import com.ssafy.rit.back.dto.postBox.response.PostBoxCreationResponse;
import com.ssafy.rit.back.dto.postBox.response.PostBoxListResponse;
import com.ssafy.rit.back.service.PostBoxService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/postbox")
@CrossOrigin("*")
public class PostBoxController {

    private final PostBoxService postBoxService;

    @GetMapping("/list")
    public ResponseEntity<PostBoxListResponse> readPostBoxList() {
        return postBoxService.readPostBoxList();
    }

    @PostMapping("/save")
    public ResponseEntity<PostBoxCreationResponse> createPostBox(@RequestBody PostBoxCreationRequestDto postBoxCreationRequestDto) {
        return postBoxService.createPostBox(postBoxCreationRequestDto);
    }
}
