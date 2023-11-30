package com.dihson103.onlinelearning.services.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.dihson103.onlinelearning.entities.UserEntity;
import com.dihson103.onlinelearning.services.IJwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class JwtService implements IJwtService {

    @Value("${application.config.security.key}")
    private String security_key;
    private static final int EXPIRATION_ACCESS_TOKEN_TIME_MINUTES = 24 * 60;
    private static final int EXPIRATION_REFRESH_TOKEN_TIME_MINUTES = 7 * 24 * 60;

    @Override
    public String generateToken(UserEntity user, Collection<SimpleGrantedAuthority> authorities) {
        return generateToken(user, authorities, EXPIRATION_ACCESS_TOKEN_TIME_MINUTES);
    }

    @Override
    public String generateRefreshToken(UserEntity user, Collection<SimpleGrantedAuthority> authorities) {
        return generateToken(user, authorities, EXPIRATION_REFRESH_TOKEN_TIME_MINUTES);
    }

    public String generateToken(UserEntity user, Collection<SimpleGrantedAuthority> authorities, int expirationTime) {
        Algorithm algorithm = Algorithm.HMAC256(security_key.getBytes());
        long expirationTimeMillis = System.currentTimeMillis() + minutesToMillis(expirationTime);
        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(expirationTimeMillis))
                .withClaim("roles", authorities.stream().map(GrantedAuthority::getAuthority).toList())
                .sign(algorithm);
    }

    private long minutesToMillis(int minutes) {
        return minutes * 60 * 1000L;
    }

}
