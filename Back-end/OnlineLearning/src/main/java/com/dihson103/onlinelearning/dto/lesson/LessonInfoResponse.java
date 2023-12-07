package com.dihson103.onlinelearning.dto.lesson;

import com.dihson103.onlinelearning.dto.session.SessionInfoResponse;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LessonInfoResponse {

    private Integer id;
    private String name;
    private Boolean status;
    private List<SessionInfoResponse> sessions;

}
