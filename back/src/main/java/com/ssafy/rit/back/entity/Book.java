package com.ssafy.rit.back.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode()
@Table(name = "book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "pub_date")
    private String pubDate;

    @Column(name = "cover")
    private String cover;

    @Column(name = "page")
    private int page;

    @Column(name = "rating", columnDefinition = "int default 0")
    private int rating ;

    @Column(name = "reviewer_cnt", columnDefinition = "int default 0")
    private int reviewerCnt;

    @Column(name = "book_group")
    private int bookGroup;

    @Column(name = "isbn", nullable = false)
    private String isbn;

    @Column(name = "genre")
    private String genre;

    @Lob
    @Column(name = "info")
    private String info;

//    관계 설정
    @OneToMany(mappedBy = "bookId")
    private List<Comment> comments;

    @OneToMany(mappedBy = "bookId")
    private List<Card> cards;

    @OneToMany(mappedBy = "bookId")
    private List<BookGenre> bookGenres;

    @OneToMany(mappedBy = "bookId")
    private List<GroupRecommendBook> groupRecommendBooks;

    @OneToMany(mappedBy = "bookId")
    private List<MemberRecommendBook> memberRecommendBooks;

    @OneToMany(mappedBy = "bookId")
    private List<BookBookshelf> bookBookshelves;

}
