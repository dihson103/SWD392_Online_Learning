import { RegisterResponse } from 'src/types/auth.type'
import { RegisterRequest } from 'src/types/user.type'
import http from 'src/utils/http'

export const registerAccount = (body: RegisterRequest) => http.post<RegisterResponse>('/api/users', body)
