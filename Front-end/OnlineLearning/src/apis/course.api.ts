import { CourseResponse, CoursesResponse, SearchCourseParams } from 'src/types/course.type'
import http from 'src/utils/http'

export const getCoursesActive = () => http.get<CoursesResponse>('/api/courses')

export const getCourseDetail = (id: number) => http.get<CourseResponse>(`api/courses/${id}`)

export const searchCoursesAndStatus = (params: SearchCourseParams) =>
  http.get<CoursesResponse>('api/courses/admin/search', { params })

export const adminGetCourse = (id: number) => http.get<CourseResponse>(`api/courses/${id}/admin`)
