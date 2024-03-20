package com.ssafy.rit.back.entity;

import java.time.LocalDate;
import java.util.Date;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
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
    private LocalDate createdAt;

//    관계 설정
    @ManyToOne
    @JoinColumn(name = "from_member_id")
    private Member fromMemberId;

    @ManyToOne
    @JoinColumn(name = "to_member_id")
    private Member toMemberId;

}
