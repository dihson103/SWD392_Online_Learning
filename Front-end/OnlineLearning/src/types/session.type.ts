import { ApiResponse } from './utils.type'

interface Session {
  id: number
  sessionName: string
  videoAddress: string
  status: boolean
}

export type SessionsResponse = ApiResponse<Session[]>

export type SessionInfoResponse = {
  id: number
  name: string
  status: boolean
}
