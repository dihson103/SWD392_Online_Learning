package com.dihson103.onlinelearning.services;

import com.dihson103.onlinelearning.dto.auth.AuthenticationRequest;
import com.dihson103.onlinelearning.dto.auth.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface IAuthenticateService {

    AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);

    AuthenticationResponse refreshToken(String refreshToken) throws IOException;

}
