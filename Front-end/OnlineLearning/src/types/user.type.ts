import { ApiResponse } from './utils.type'

export interface User {
  id: number
  username: string
  email: string
  dob: string
  phone: string
  address: string
  role: string
}

export interface RegisterRequest {
  username: string
  email: string
  dob?: string | undefined
  phone: string
  address?: string | undefined
  password: string
}

export type UsersResponse = ApiResponse<User[]>

export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

export interface UserListConfig {
  searchValue?: string
  role?: string
  status?: string
}
