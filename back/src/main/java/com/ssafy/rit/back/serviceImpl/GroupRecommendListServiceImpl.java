package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.entity.GroupRecommendBook;
import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.repository.CommentRepository;
import com.ssafy.rit.back.repository.GroupRecommendBookRepository;
import com.ssafy.rit.back.repository.MemberRepository;
import com.ssafy.rit.back.service.GroupRecommendListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupRecommendListServiceImpl implements GroupRecommendListService {

    private final GroupRecommendBookRepository groupRecommendBookRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

    @Override
    public void createGroupRecommendList() {
        for (int i = 0; i < 5; i++) {
            List<GroupRecommendBook> allByRecList = groupRecommendBookRepository.findAllByReGroupOrderByCreatedAt(i);
            List<Member> allByShelfGroup = memberRepository.findAllByShelfGroup(i);
        }
    }
}
