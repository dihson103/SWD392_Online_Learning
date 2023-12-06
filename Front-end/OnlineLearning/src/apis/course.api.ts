import { CourseResponse, CoursesResponse, CreateCourseType, SearchCourseParams } from 'src/types/course.type'
import { ApiResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const getCoursesActive = () => http.get<CoursesResponse>('/api/courses')

export const getCourseDetail = (id: number) => http.get<CourseResponse>(`api/courses/${id}`)

export const searchCoursesAndStatus = (params: SearchCourseParams) =>
  http.get<CoursesResponse>('api/courses/admin/search', { params })

export const adminGetCourse = (id: number) => http.get<CourseResponse>(`api/courses/${id}/admin`)

// export const addNewCourse = (body: FormData) =>
//   http.post<ApiResponse<null>>('api/courses', body, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   })

export const addNewCourse = (body: CreateCourseType) => http.post<ApiResponse<null>>('api/courses', body)
