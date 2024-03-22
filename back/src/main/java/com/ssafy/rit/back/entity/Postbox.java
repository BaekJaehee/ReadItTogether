package com.ssafy.rit.back.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor @AllArgsConstructor
@EqualsAndHashCode
@Table(name = "postbox")
public class Postbox {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postbox_id")
    private int id;

    @Column(name = "created_at")
    private LocalDate createdAt;

//    관계 설정
    @ManyToOne
    @JoinColumn(name = "card_id")
    private Card cardId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;

}
