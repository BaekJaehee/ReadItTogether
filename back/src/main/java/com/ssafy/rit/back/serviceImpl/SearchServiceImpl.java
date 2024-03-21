package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.search.response.SearchResponse;
import com.ssafy.rit.back.repository.BookRepository;
import com.ssafy.rit.back.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final BookRepository bookRepository;

    @Override
    public ResponseEntity<SearchResponse> performSearch(String query, int page) {
        return null;
    }
}
