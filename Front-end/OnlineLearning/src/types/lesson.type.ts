import { SessionInfoResponse } from './session.type'
import { ApiResponse } from './utils.type'

export interface Lesson {
  id: number
  title: string
  content: string
  status: boolean
}

export type LessonsResponse = ApiResponse<Lesson[]>

export type LessonInfoResponse = {
  id: number
  name: string
  status: boolean
  sessions: SessionInfoResponse[]
}
