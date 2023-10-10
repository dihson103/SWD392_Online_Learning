package com.dihson103.onlinelearning.dto.course;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;

@Getter
@Setter
@Builder
public class CourseRequest {

    @NotBlank(message = "Course's should not be blank.")
    private String courseName;

    @NotNull(message = "Price should not be null.")
    private Double price;

    @NotNull(message = "")
    private String title;

    @NotNull(message = "Status should not be null.")
    private Boolean status;

}
