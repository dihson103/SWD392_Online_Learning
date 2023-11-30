package com.dihson103.onlinelearning.dto.auth;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RefreshTokenRequest {
    private String token;
}
