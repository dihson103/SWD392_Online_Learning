package com.dihson103.onlinelearning.services;

import com.dihson103.onlinelearning.dto.course.CourseResponse;
import com.dihson103.onlinelearning.entities.Course;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface ICourseRedisService {

    void clear();

    Course getCourseFromRedisById(Integer courseId);

    void saveCourseToRedisById(Integer courseId, CourseResponse course);
}
