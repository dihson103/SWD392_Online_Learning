import { SessionResponse, SessionsResponse } from 'src/types/session.type'
import { ApiResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { SessionCreateSchema, SessionUpdateSchema } from 'src/utils/rules'

export const getSessionsByLesson = (id: number) => http.get<SessionsResponse>(`api/sessions/${id}/lesson`)

export const addNewSession = (body: SessionCreateSchema) => http.post<ApiResponse<null>>('api/sessions', body)

export const updateSession = (body: SessionUpdateSchema) => http.put<ApiResponse<null>>(`api/sessions/${body.id}`, body)

export const getSessionById = (sessionId: number) => http.get<SessionResponse>(`api/sessions/${sessionId}`)
