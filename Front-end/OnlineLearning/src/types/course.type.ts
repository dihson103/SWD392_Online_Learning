import { ApiResponse } from './utils.type'

export interface Course {
  id: number
  courseName: string
  price: number
  title: string
  status: boolean
  createdDate: string
  publicDate: string
  image: string
}

export type CoursesResponse = ApiResponse<Course[]>

export type CourseResponse = ApiResponse<Course>

export type CourseRequest = Omit<Course, 'id'>

export type SearchCourseParams = {
  searchValue: string
  status: 'true' | 'false'
}
