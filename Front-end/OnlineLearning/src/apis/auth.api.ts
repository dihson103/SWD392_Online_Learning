import { AuthResponse, RegisterResponse } from 'src/types/auth.type'
import { RegisterRequest } from 'src/types/user.type'
import http from 'src/utils/http'

export const registerAccount = (body: RegisterRequest) => http.post<RegisterResponse>('/api/users', body)

export const login = (body: { email: string; password: string }) => http.post<AuthResponse>('api/auth/login', body)

export const signOut = () => http.get('/api/auth/logout')

export const getRefreshToken = (token: string) => http.post<AuthResponse>('/api/auth/refresh-access-token', { token })
