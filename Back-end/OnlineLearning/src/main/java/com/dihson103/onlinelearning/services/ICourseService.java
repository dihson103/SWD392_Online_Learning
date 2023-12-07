package com.dihson103.onlinelearning.services;

import com.dihson103.onlinelearning.dto.course.*;
import com.dihson103.onlinelearning.dto.filter.FilterRequestDto;

import java.util.List;

public interface ICourseService {
    void createCourse(CreateCourseRequest courseRequest);

    void updateCourse(UpdateCourseRequest courseRequest);

    CourseResponse getCourseById(Integer courseId);

    CourseResponse getCourseByIdAndStatusIsTrue(Integer courseId);

    List<CourseResponse> getAllCourseStatusIsTrue();

    List<CourseResponse> filterCourses(FilterRequestDto filterRequestDto);

    void changeCourseStatus(CourseStatusRequest courseStatusRequest);

    List<CourseResponse> findTopNewCourses();

    List<CourseResponse> searchCourses(String searchValue);

    List<CourseResponse> searchCourses(String searchValue, Boolean status);

    CourseInfoResponse getCourseStatusInfo(Integer courseId);
}
