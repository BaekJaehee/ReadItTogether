package com.ssafy.rit.back.dto.guestBook.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GuestBookRemovalResponse {

    private String message;

    private boolean data;

    public static GuestBookRemovalResponse createGuestBookRemovalResponse(String message, boolean dto) {
        return GuestBookRemovalResponse.builder()
                .message(message)
                .data(dto)
                .build();
    }
}
