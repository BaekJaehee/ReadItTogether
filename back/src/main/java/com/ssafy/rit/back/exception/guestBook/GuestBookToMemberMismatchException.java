package com.ssafy.rit.back.exception.guestBook;

public class GuestBookToMemberMismatchException extends RuntimeException {

    public GuestBookToMemberMismatchException() {
        super("작성자가 아닌 유저는 삭제할 수 없습니다.");
    }
}
