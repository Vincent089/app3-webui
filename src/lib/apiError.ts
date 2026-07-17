export interface ApiErrorPayload {
  code: string
  message: string
  details?: Record<string, string[]>
}

export class ApiError extends Error {
  code: string
  details?: Record<string, string[]>

  constructor(payload: ApiErrorPayload) {
    super(payload.message)
    this.code = payload.code
    this.details = payload.details
  }
}
