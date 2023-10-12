package com.dihson103.onlinelearning.repositories;

import com.dihson103.onlinelearning.entities.Enroll;
import com.dihson103.onlinelearning.entities.EnrollKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EnrollRepository extends JpaRepository<Enroll, EnrollKey>, JpaSpecificationExecutor<Enroll> {

    @Query("""
        SELECT e FROM Enroll e 
        WHERE e.user.username = :username
    """)
    List<Enroll> getListEnrollByUsername(String username);

    @Query("""
        SELECT e FROM Enroll e
        WHERE e.course.id = :courseId   
    """)
    List<Enroll> getListEnrollByCourseId(Integer courseId);

}
