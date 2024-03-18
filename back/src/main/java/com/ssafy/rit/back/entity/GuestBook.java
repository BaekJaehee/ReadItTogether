package com.ssafy.rit.back.entity;

import java.util.Date;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@EqualsAndHashCode
@Table(name = "guest_book")
public class GuestBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "guest_book_id")
    private Long id;

    @Column(name = "content", length = 255, nullable = false)
    private String content;

    @Column(name = "created_at")
    private Date createdAt;

//    관계 설정
    @ManyToOne
    @JoinColumn(name = "from_member_id")
    private Member fromMemberId;

    @ManyToOne
    @JoinColumn(name = "to_member_id")
    private Member toMemberId;

}
