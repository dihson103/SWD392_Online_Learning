package com.dihson103.onlinelearning.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "Enroll")
public class Enroll {

    @EmbeddedId
    private EnrollKey id;

    @ManyToOne
    @MapsId("accountId")
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(nullable = false)
    private Date enrollDate;

    @Column(nullable = false)
    private Double price;

}
