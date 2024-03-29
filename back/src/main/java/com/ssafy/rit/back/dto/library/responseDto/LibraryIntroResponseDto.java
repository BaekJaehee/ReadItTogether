package com.ssafy.rit.back.dto.library.responseDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LibraryIntroResponseDto {

    private String intro;

    private int isMine;

    private int isReceive;

    private String nickname;

    private String profileImage;

    private int followingNum;

    private int followerNum;

    private int isFollowing;

    private String email;
}
