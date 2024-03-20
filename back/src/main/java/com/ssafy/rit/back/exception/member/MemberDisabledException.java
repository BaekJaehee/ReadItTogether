package com.ssafy.rit.back.exception.member;

public class MemberDisabledException extends RuntimeException {

    public MemberDisabledException(String message) {
        super(message);
    }
}
