package com.ssafy.rit.back.dto.bookshelf.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookshelfUploadResponse {

    private String message;

    private boolean data;
}
