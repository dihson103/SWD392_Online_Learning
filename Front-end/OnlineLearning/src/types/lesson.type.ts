import { ApiResponse } from './utils.type'

export interface Lesson {
  id: number
  title: string
  content: string
  status: boolean
}

export type LessonsResponse = ApiResponse<Lesson[]>
