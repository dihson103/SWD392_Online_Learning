import http from 'src/utils/http'

export const getFileUrl = (fileName: string) => http.get('api/videos/get-url?filename=' + fileName)
