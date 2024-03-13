package com.ssafy.rit.back.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode()
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "nickname", unique = true, nullable = false)
    private String nickname;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "is_disabled")
    private int isDisabled = 0;

    @Column(name = "birth", nullable = false)
    private String birth;

    @Column(name = "gender", nullable = false)
    private int gender;

    @Column(name = "is_receivable", nullable = false)
    private int isReceivable = 0;

    @Column(name = "intro")
    private String intro = "소개글을 입력하세요.";

    @Column(name = "naver_code")
    private String naverCode;

    @Column(name = "member_group")
    private int memberGroup = 0;

    @Column(name = "shelf_group")
    private int shelfGroup = 0;
}
