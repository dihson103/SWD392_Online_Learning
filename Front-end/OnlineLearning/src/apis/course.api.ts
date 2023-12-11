import {
  ChangeCourseStatusRequest,
  CourseInfoResponse,
  CourseResponse,
  CoursesResponse,
  CreateCourseType,
  SearchCourseParams
} from 'src/types/course.type'
import { ApiResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { CourseUpdateSchema } from 'src/utils/rules'

export const getCoursesActive = () => http.get<CoursesResponse>('/api/courses')

export const getCourseDetail = (id: number) => http.get<CourseResponse>(`api/courses/${id}`)

export const searchCoursesAndStatus = (params: SearchCourseParams) =>
  http.get<CoursesResponse>('api/courses/admin/search', { params })

export const adminGetCourse = (id: number) => http.get<CourseResponse>(`api/courses/${id}/admin`)

export const addNewCourse = (body: CreateCourseType) => http.post<ApiResponse<null>>('api/courses', body)

export const updateCourseFunction = (body: CourseUpdateSchema) => http.put<ApiResponse<null>>('api/courses', body)

export const getCourseStatusInfo = (id: number) =>
  http.get<ApiResponse<CourseInfoResponse>>(`api/courses/get-status-info/${id}`)

export const changeCourseStatus = (body: ChangeCourseStatusRequest) =>
  http.put<ApiResponse<null>>('api/courses/change-status', body)
