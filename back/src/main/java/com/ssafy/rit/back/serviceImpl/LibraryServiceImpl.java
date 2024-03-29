package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.library.requestDto.LibraryIntroUpdateRequestDto;
import com.ssafy.rit.back.dto.library.response.LibraryIntroResponse;
import com.ssafy.rit.back.dto.library.response.LibraryIntroUpdateResponse;
import com.ssafy.rit.back.dto.library.responseDto.LibraryIntroResponseDto;
import com.ssafy.rit.back.entity.Follow;
import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.exception.member.MemberNotFoundException;
import com.ssafy.rit.back.repository.FollowRepository;
import com.ssafy.rit.back.repository.MemberRepository;
import com.ssafy.rit.back.service.LibraryService;
import com.ssafy.rit.back.util.CommonUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LibraryServiceImpl implements LibraryService {

    private final MemberRepository memberRepository;
    private final CommonUtil commonUtil;
    private final FollowRepository followRepository;

    // 다른 사람 서재 방문 시 받을 intro 데이터
    @Override
    public ResponseEntity<LibraryIntroResponse> readLibraryIntro(Long memberId) {

        Member currentMember = commonUtil.getMember();

        Member thisMember = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);

        int isMine = currentMember.equals(thisMember) ? 1 : 0;
        int isFollowing = followRepository.findFollow(currentMember, thisMember).isPresent() ? 1 : 0;

        LibraryIntroResponseDto detailDto = LibraryIntroResponseDto.builder()
                .isMine(isMine)
                .isReceive(thisMember.getIsReceivable())
                .nickname(thisMember.getNickname())
                .profileImage(thisMember.getProfileImage())
                .isFollowing(isFollowing)
                .intro(thisMember.getIntro())
                .email(thisMember.getEmail())
                .followerNum(followRepository.countByFollowerMember(currentMember))
                .followingNum(followRepository.countByFollowingMember(currentMember))
                .build();

        LibraryIntroResponse response = new LibraryIntroResponse("서재 방문 성공", detailDto);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 서재 소개글 수정
    @Override
    @Transactional
    public ResponseEntity<LibraryIntroUpdateResponse> updateLibraryIntro(LibraryIntroUpdateRequestDto libraryIntroUpdateRequestDto) {

        Member currnetMember = commonUtil.getMember();

        currnetMember.setIntro(libraryIntroUpdateRequestDto.getIntro());

        LibraryIntroUpdateResponse response = new LibraryIntroUpdateResponse("서재 소개글 수정 완료", true);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
