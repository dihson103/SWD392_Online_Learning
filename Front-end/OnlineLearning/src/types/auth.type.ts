import { User } from './user.type'
import { ApiResponse, SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  user_response: User
}>

export type RegisterResponse = ApiResponse<null>
