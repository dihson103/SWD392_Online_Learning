export interface User {
  id: number
  username: string
  email: string
  dob: string
  phone: string
  address: string
}

export interface RegisterRequest {
  username: string
  email: string
  dob?: string | undefined
  phone: string
  address?: string | undefined
  password: string
}
