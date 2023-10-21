import { User } from './user.type'
import { ApiResponse } from './utils.type'

export type AuthResponse = ApiResponse<{
  access_token: string
  refresh_token: string
  user_response: User
}>

export type RegisterResponse = ApiResponse<null>
