package com.ssafy.rit.back.entity;

import java.util.Date;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@EqualsAndHashCode
@Table(name = "member_recommend_book")
public class MemberRecommendBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_recommend_id")
    private int id;

    @Column(name = "created_at")
    private Date createdAt;

//    관계 설정
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book bookId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;
}
