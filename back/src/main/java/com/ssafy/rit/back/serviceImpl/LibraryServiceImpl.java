package com.ssafy.rit.back.serviceImpl;

import com.ssafy.rit.back.dto.library.requestDto.LibraryIntroUpdateRequestDto;
import com.ssafy.rit.back.dto.library.response.LibraryIntroResponse;
import com.ssafy.rit.back.dto.library.response.LibraryIntroUpdateResponse;
import com.ssafy.rit.back.dto.library.response.LibraryStatusResponse;
import com.ssafy.rit.back.dto.library.responseDto.LibraryIntroResponseDto;
import com.ssafy.rit.back.dto.library.responseDto.LibraryStatusResponseDto;
import com.ssafy.rit.back.entity.Member;
import com.ssafy.rit.back.exception.member.MemberNotFoundException;
import com.ssafy.rit.back.repository.MemberRepository;
import com.ssafy.rit.back.service.LibraryService;
import com.ssafy.rit.back.util.CommonUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LibraryServiceImpl implements LibraryService {

    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;
    private final CommonUtil commonUtil;

    // 다른 사람 서재 방문 시 받을 intro 데이터
    @Override
    public ResponseEntity<LibraryIntroResponse> readLibraryIntro(Long memberId) {

        Member thisMember = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);

        LibraryIntroResponseDto detailDto = modelMapper.map(thisMember, LibraryIntroResponseDto.class);

        LibraryIntroResponse response = new LibraryIntroResponse("서재 방문 성공", detailDto);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 내 서재 방문 시 받을 intro 데이터와 우편 수신 가능 여부 데이터
    @Override
    public ResponseEntity<LibraryStatusResponse> readLibraryStatus() {

        Member currentMember = commonUtil.getMember();

        LibraryStatusResponseDto detailDto = modelMapper.map(currentMember, LibraryStatusResponseDto.class);

        LibraryStatusResponse response = new LibraryStatusResponse("내 서재 방문 성공", detailDto);

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
