package com.dihson103.onlinelearning.services.impl;

import com.dihson103.onlinelearning.dto.course.CourseResponse;
import com.dihson103.onlinelearning.dto.course.CreateCourseRequest;
import com.dihson103.onlinelearning.dto.course.UpdateCourseRequest;
import com.dihson103.onlinelearning.dto.filter.FilterRequestDto;
import com.dihson103.onlinelearning.entities.Course;
import com.dihson103.onlinelearning.repositories.CourseRepository;
import com.dihson103.onlinelearning.services.FiltersSpecification;
import com.dihson103.onlinelearning.services.ICourseService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService implements ICourseService {

    private final CourseRepository courseRepository;
    private final ModelMapper modelMapper;
    private final FiltersSpecification<Course> filtersSpecification;

    @Override
    public void createCourse(CreateCourseRequest courseRequest) {
        Course course = modelMapper.map(courseRequest, Course.class);
        course.setCreatedDate(LocalDateTime.now());
        if(courseRequest.getStatus()){
            course.setPublicDate(LocalDateTime.now());
        }
        courseRepository.save(course);
    }

    private Course findCourseById(Integer courseId){
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Can not find course has id: " + courseId));
    }

    @Override
    public void updateCourse(UpdateCourseRequest courseRequest) {
        Course course = findCourseById(courseRequest.getId());
        course.setCourseName(courseRequest.getCourseName());
        course.setPrice(courseRequest.getPrice());
        course.setTitle(courseRequest.getTitle());
        if(courseRequest.getStatus() && !course.getStatus()){
            course.setStatus(true);
            course.setPublicDate(LocalDateTime.now());
        }
        course.setStatus(courseRequest.getStatus());
        courseRepository.save(course);
    }

    @Override
    public CourseResponse getCourseById(Integer courseId) {
        Course course = findCourseById(courseId);
        return modelMapper.map(course, CourseResponse.class);
    }

    @Override
    public CourseResponse getCourseByIdAndStatusIsTrue(Integer courseId) {
        Course course = courseRepository.findByIdAndStatusIsTrue(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Can not find course has id: " + courseId));
        return modelMapper.map(course, CourseResponse.class);
    }

    @Override
    public List<CourseResponse> getAllCourseStatusIsTrue() {
        List<Course> courses = courseRepository.findByStatusIsTrue();
        return courses.stream()
                .map(course -> modelMapper.map(course, CourseResponse.class))
                .toList();
    }

    @Override
    public List<CourseResponse> filterCourses(FilterRequestDto filterRequestDto) {
        Specification specification = filtersSpecification.getSpecification(
                filterRequestDto.getSearchRequestDto(),
                filterRequestDto.getGlobalOperator()
        );
        List<Course> courses = courseRepository.findAll(specification);
        return courses.stream()
                .map(course -> modelMapper.map(course, CourseResponse.class))
                .toList();
    }
}
