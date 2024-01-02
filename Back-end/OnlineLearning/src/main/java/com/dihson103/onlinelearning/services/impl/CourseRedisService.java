package com.dihson103.onlinelearning.services.impl;

import com.dihson103.onlinelearning.configs.GsonFactory;
import com.dihson103.onlinelearning.dto.course.CourseResponse;
import com.dihson103.onlinelearning.entities.Course;
import com.dihson103.onlinelearning.services.ICourseRedisService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CourseRedisService implements ICourseRedisService {

    private final RedisTemplate<String, String> redisTemplate;
    private final Gson gson;

    private String getKeyFrom (Integer courseId){
        return "Course-id-" + courseId;
    }

    @Override
    public void clear() {

        redisTemplate.getConnectionFactory().getConnection().flushAll();
    }

    @Override
    public Course getCourseFromRedisById(Integer courseId) {
        String key = getKeyFrom(courseId);
        String json = (String) redisTemplate.opsForValue().get(key);

        Course course = json != null ? gson.fromJson(json, Course.class) : null;

        return course;
    }

    @Override
    public void saveCourseToRedisById(Integer courseId, CourseResponse course) {
        String key = getKeyFrom(courseId);
        String json = gson.toJson(course);
        redisTemplate.opsForValue().set(key, json);
    }
}
