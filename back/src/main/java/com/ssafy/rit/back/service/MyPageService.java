package com.ssafy.rit.back.service;

import java.util.List;

public interface MyPageService {

    int getEvaluatedBookCnt();
    int getLikedBookCnt();
    int getSendCardCnt();
    List<Long> getGenreNoList();
}
