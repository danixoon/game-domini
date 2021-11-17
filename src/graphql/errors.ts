export enum ErrorCodes {
  INVALID_QUERY,
}

export class ApiError extends Error {
  public extensions: any;
  constructor(code: ErrorCodes, message: string) {
    super(message);
    this.extensions = { code };
  }
}

export const invalidQueryError = (message: string = "Некорректный запрос") =>
  new ApiError(ErrorCodes.INVALID_QUERY, message);
