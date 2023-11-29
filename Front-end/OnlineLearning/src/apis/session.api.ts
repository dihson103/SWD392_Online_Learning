import { SessionsResponse } from 'src/types/session.type'
import http from 'src/utils/http'

export const getSessionsByLesson = (id: number) => http.get<SessionsResponse>(`api/sessions/${id}/lesson`)
