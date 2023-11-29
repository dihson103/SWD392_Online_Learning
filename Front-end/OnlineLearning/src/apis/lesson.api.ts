import { LessonsResponse } from 'src/types/lesson.type'
import http from 'src/utils/http'

export const getLessonsByCourse = (id: number) => http.get<LessonsResponse>(`api/lessons/${id}/course`)
