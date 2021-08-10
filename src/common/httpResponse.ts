export class HttpResponse<T = any> {
  public readonly data: T;
  public readonly error: string | null = null;
  public readonly statusCode: number;

  constructor(data: T, error: string | null, statusCode: number) {
    this.data = data;
    this.error = error;
    this.statusCode = statusCode;
  }

  static success<T>(data: T, statusCode = 200) {
    return new HttpResponse(data, null, statusCode);
  }

  static error(message: string, statusCode = 400) {
    return new HttpResponse(null, message, statusCode);
  }
}
