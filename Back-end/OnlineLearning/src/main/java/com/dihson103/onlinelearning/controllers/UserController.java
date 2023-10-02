package com.dihson103.onlinelearning.controllers;

import com.dihson103.onlinelearning.dto.common.ApiResponse;
import com.dihson103.onlinelearning.dto.user.UserRequest;
import com.dihson103.onlinelearning.dto.user.UserResponse;
import com.dihson103.onlinelearning.services.impl.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping
    @ResponseStatus(CREATED)
    public ApiResponse register(@Valid @RequestBody UserRequest userRequest){
        service.register(userRequest);
        return ApiResponse.builder()
                .message("Create account success.")
                .build();
    }

    @GetMapping
    @ResponseStatus(OK)
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ADMIN_USER')")
    public ApiResponse<List<UserResponse>> getAllUsers(){
        List<UserResponse> users = service.getUsers();
        return ApiResponse.<List<UserResponse>>builder()
                .message("Get data success.")
                .data(users)
                .build();
    }

    @PostMapping("/admin")
    @ResponseStatus(CREATED)
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ADMIN_USER')")
    public ApiResponse createUser(@Valid @RequestBody UserRequest userRequest){
        service.createUser(userRequest);
        return ApiResponse.builder()
                .message("Create account success.")
                .build();
    }

    @DeleteMapping("{user-id}")
    @ResponseStatus(OK)
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ADMIN_USER')")
    public ApiResponse deleteUser(@PathVariable("user-id") Integer userId){
        service.deleteUser(userId);
        return ApiResponse.builder()
                .message("Delete user has id: " + userId + " success.")
                .build();
    }
}
