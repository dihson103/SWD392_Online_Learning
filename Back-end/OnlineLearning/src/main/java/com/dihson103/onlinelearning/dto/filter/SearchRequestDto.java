package com.dihson103.onlinelearning.dto.filter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class FilterRequest {

    private String column;
    private String value;

}
