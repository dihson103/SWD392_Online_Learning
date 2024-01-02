package com.dihson103.onlinelearning.services;

import com.dihson103.onlinelearning.dto.filter.FilterRequestDto;
import com.dihson103.onlinelearning.dto.session.SessionRequest;
import com.dihson103.onlinelearning.dto.session.SessionResponse;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ISessionService {
    void createSession(SessionRequest sessionRequest);

    void updateSession(Integer sessionId, SessionRequest sessionRequest);

    SessionResponse getSessionActiveById(Integer sessionId, Authentication authentication );

    List<SessionResponse> getSessionsActiveByLesson(Integer lessonId);

    List<SessionResponse> filter(FilterRequestDto filterRequestDto);
}
