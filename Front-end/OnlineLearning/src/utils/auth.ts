import { User } from 'src/types/user.type'

export const saveAccessToken = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token')

export const saveRefeshToken = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const clearTokenAndProfile = () => {
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  localStorage.removeItem('access_token')
}

export const getRefreshFromLS = () => localStorage.getItem('refresh_token')

export const getProfileFromLS = (): User => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile: User) => localStorage.setItem('profile', JSON.stringify(profile))
