import axios, { type AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import {
  clearTokenAndProfile,
  getAccessTokenFromLS,
  getRefreshFromLS,
  saveAccessToken,
  saveRefeshToken,
  setProfileToLS
} from './auth'
import { AuthResponse } from 'src/types/auth.type'
import { getRefreshToken } from 'src/apis/auth.api'

class Http {
  instance: AxiosInstance
  private accessToken: string | null
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = 'Bearer ' + this.accessToken
        }
        return config
      },
      (error) => {
        Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === 'api/auth/login') {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          saveAccessToken(this.accessToken)
          setProfileToLS(data.data.user_response)
          saveRefeshToken(data.data.refresh_token)
        } else if (url === '/api/auth/logout') {
          this.accessToken = ''
          clearTokenAndProfile()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status == 401) {
          this.accessToken = null
          this.refreshTokenRequest = this.refreshTokenRequest
            ? this.refreshTokenRequest
            : refreshToken().finally(() => {
                this.refreshTokenRequest = null
              })
          return this.refreshTokenRequest
            .then((newAccessToken) => {
              this.accessToken = newAccessToken
              const config = error.config as AxiosRequestConfig
              config.headers = config.headers ?? {}
              config.headers.Authorization = 'Bearer ' + newAccessToken
              return this.instance.request(config)
            })
            .catch((refreshTokenError) => {
              throw refreshTokenError
            })
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any | undefined = error.response?.data
        const message = data.message || error.message
        toast.error(message)
        return Promise.reject(error)
      }
    )
  }
}

const refreshToken = async () => {
  try {
    const refresh_token = 'Bearer ' + getRefreshFromLS()
    const response = await getRefreshToken(refresh_token)
    const data = response.data as AuthResponse
    setProfileToLS(data.data.user_response)
    saveAccessToken(data.data.access_token)
    saveRefeshToken(data.data.refresh_token)
    return data.data.refresh_token
  } catch (error) {
    clearTokenAndProfile()
    throw error
  }
}

const http = new Http().instance

export default http
