package com.dihson103.onlinelearning.dto.course;

import com.dihson103.onlinelearning.dto.lesson.LessonInfoResponse;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseInfoResponse {

    private Integer id;
    private String name;
    private Boolean status;
    private List<LessonInfoResponse> lessons;

}
