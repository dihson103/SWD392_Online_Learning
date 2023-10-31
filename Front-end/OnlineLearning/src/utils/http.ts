import axios, { type AxiosInstance, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { clearTokenAndProfile, getAccessTokenFromLS, saveAccessToken, saveRefeshToken, setProfileToLS } from './auth'
import { AuthResponse } from 'src/types/auth.type'

class Http {
  instance: AxiosInstance
  private accessToken: string | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://swd-backend-production.up.railway.app/',
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
      function (error: AxiosError) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any | undefined = error.response?.data
        const message = data.message || error.message
        toast.error(message)
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
