package com.dihson103.onlinelearning.dto.course;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder

public class UpdateCourseRequest {

    @NotNull(message = "Id should not be null.")
    private Integer id;

    @NotBlank(message = "Course's should not be blank.")
    private String courseName;

    @NotNull(message = "Price should not be null.")
    private Double price;

    @NotNull(message = "")
    private String title;

}
