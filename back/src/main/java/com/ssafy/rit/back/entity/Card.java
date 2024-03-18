package com.ssafy.rit.back.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "card")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@EqualsAndHashCode
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    private Long id;

    @Column(name = "comment")
    private String comment;

    @Column(name = "create_at")
    private Date createdAt;

//    관계 설정
    @ManyToOne
    @JoinColumn(name = "from_member_id")
    private Member fromMemberId;

    @ManyToOne
    @JoinColumn(name = "to_member_id")
    private Member toMemberId;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book bookId;

    @OneToMany(mappedBy = "cardId")
    private List<Postbox> postboxes;

}
