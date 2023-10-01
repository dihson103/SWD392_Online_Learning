package com.dihson103.onlinelearning.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "Discount")
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Double discount;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date dateFrom;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date dateTo;

    @ManyToOne
    @JoinColumn(name = "courseId", nullable = false)
    private Course course;

}
