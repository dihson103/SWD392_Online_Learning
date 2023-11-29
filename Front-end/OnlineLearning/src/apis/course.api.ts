import { CourseResponse, CoursesResponse } from 'src/types/course.type'
import http from 'src/utils/http'

export const getCoursesActive = () => http.get<CoursesResponse>('/api/courses')

export const getCourseDetail = (id: number) => http.get<CourseResponse>(`api/courses/${id}`)
