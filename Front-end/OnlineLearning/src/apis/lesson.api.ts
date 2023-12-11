import { LessonsResponse } from 'src/types/lesson.type'
import { ApiResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { LessonCreateSchema, LessonUpdateSchema } from 'src/utils/rules'

export const getLessonsByCourse = (id: number) => http.get<LessonsResponse>(`api/lessons/${id}/course`)

export const addLesson = (body: LessonCreateSchema) => http.post<ApiResponse<null>>(`api/lessons`, body)

export const updateLesson = (body: LessonUpdateSchema) => http.put<ApiResponse<null>>(`api/lessons/${body.id}`, body)
