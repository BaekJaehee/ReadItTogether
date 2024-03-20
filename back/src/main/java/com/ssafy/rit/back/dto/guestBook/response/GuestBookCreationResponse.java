package com.ssafy.rit.back.dto.guestBook.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GuestBookCreationResponse {

    private String message;

    private boolean data;

    public static GuestBookCreationResponse createGuestBookCreationResponse(String message, boolean dto) {
        return GuestBookCreationResponse.builder()
                .message(message)
                .data(dto)
                .build();
    }
}
