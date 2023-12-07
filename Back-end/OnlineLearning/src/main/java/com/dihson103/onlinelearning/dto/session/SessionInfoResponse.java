package com.dihson103.onlinelearning.dto.session;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionInfoResponse {

    private Integer id;
    private String name;
    private Boolean status;

}
