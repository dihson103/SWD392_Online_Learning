import { LessonInfoResponse } from './lesson.type'
import { ApiResponse } from './utils.type'

export interface Course {
  id: number
  courseName: string
  price: number
  title: string
  status: boolean
  createdDate: string
  publicDate?: string
  image: string
}

export type CoursesResponse = ApiResponse<Course[]>

export type CourseResponse = ApiResponse<Course>

export type CourseRequest = Omit<Course, 'id'>

export type SearchCourseParams = {
  searchValue: string
  status: 'true' | 'false'
}

export type CreateCourseType = {
  courseName: string
  price: number
  title: string
  image: string
}

export type CourseInfoResponse = {
  id: number
  name: string
  status: boolean
  lessons: LessonInfoResponse[]
}

export type ChangeCourseStatusRequest = {
  courseId: number
  status: boolean
  lessonIds: number[]
  sessionIds: number[]
}
