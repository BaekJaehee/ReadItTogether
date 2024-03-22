package com.ssafy.rit.back.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "bookshelf")
public class Bookshelf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookshelf_id")
    private int id;

    @Column(name = "is_read")
    private int isRead;

    @Column(name = "is_rate")
    private int isRate;

    @Column(name = "rating")
    private int rating;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "cover")
    private String cover;

//  관계 설정
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member memberId;

}