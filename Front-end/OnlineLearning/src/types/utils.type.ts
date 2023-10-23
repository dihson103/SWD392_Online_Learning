export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface ApiResponse<Data> {
  message: string
  data?: Data
}
