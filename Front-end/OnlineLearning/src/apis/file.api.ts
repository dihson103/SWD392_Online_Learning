import { FileReponse } from 'src/types/file.type'
import { ApiResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const getFileUrl = (fileName: string) => http.get('api/videos/get-url?filename=' + fileName)

export const uploadImage = (body: FormData) =>
  http.post<ApiResponse<FileReponse>>('api/media/images', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const uploadVideo = (body: FormData) =>
  http.post<ApiResponse<FileReponse>>('api/media/videos', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
