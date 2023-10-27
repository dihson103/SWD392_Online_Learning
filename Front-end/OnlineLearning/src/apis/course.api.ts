import { CourseResponse } from 'src/types/course.type'
import http from 'src/utils/http'

export const getCoursesActive = () => http.get<CourseResponse>('/api/courses')
