package com.dihson103.onlinelearning.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@RestControllerAdvice
public class MyExceptionHandle {

    @ExceptionHandler(WrongTokenException.class)
    @ResponseStatus(UNAUTHORIZED)
    public Map<String, String> handleWrongTokenException(WrongTokenException exception){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", exception.getMessage());
        return errors;
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(FORBIDDEN)
    public Map<String, String> handleAccessDeniedException(AccessDeniedException exception){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", exception.getMessage());
        return errors;
    }

    @ExceptionHandler(Exception.class)
    public Map<String, String> handleException(Exception exception){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", exception.getMessage());
        exception.printStackTrace();
        return errors;
    }

}
