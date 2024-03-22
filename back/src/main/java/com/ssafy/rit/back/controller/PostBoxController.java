package com.ssafy.rit.back.controller;

import com.ssafy.rit.back.dto.postBox.response.PostBoxListResponse;
import com.ssafy.rit.back.service.PostBoxService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
