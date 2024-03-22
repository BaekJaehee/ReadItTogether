package com.ssafy.rit.back.exception.Book;

public class CommentException extends RuntimeException{
    public CommentException(String message) {
        super(message);
    }

    public static CommentException ratingException() {
        return new CommentException("평점을 부과하지 않았습니다.");
    }

    public static CommentException commentLengthException() {
        return new CommentException("내용이 없거나 길이가 맞지 않습니다.");
    }

}
