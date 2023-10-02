package com.dihson103.onlinelearning.controllers;

import com.dihson103.onlinelearning.dto.auth.AuthenticationRequest;
import com.dihson103.onlinelearning.dto.auth.AuthenticationResponse;
import com.dihson103.onlinelearning.dto.common.ApiResponse;
import com.dihson103.onlinelearning.services.IAuthenticateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final IAuthenticateService service;

    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> login(@RequestBody @Valid AuthenticationRequest authenticationRequest){
        AuthenticationResponse authenticationResponse = service.authenticate(authenticationRequest);
        return ApiResponse.<AuthenticationResponse>builder()
                .message("Login success.")
                .data(authenticationResponse)
                .build();
    }

}
