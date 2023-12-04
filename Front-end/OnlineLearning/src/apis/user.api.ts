import { UsersResponse, User, ChangePasswordRequest, UserListConfig } from 'src/types/user.type'
import { ApiResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { UserSchema } from 'src/utils/rules'

export const getUsers = (params: UserListConfig) => http.get<UsersResponse>('api/users', { params })

export const deleteUser = (userId: number) => http.delete<ApiResponse<null>>(`api/users/${userId}`)

export const updateUser = (data: User) => http.put<ApiResponse<null>>(`api/users/update-with-role/${data.role}`, data)

export const addUser = (data: UserSchema) =>
  http.post<ApiResponse<null>>('api/users', { ...data, password: data.email })

export const editUserProfile = (username: string, data: User) =>
  http.put<ApiResponse<null>>(`api/users/${username}`, data)

export const userChangePassword = (username: string, body: ChangePasswordRequest) =>
  http.put<ApiResponse<null>>(`api/users/change-password/${username}`, body)
