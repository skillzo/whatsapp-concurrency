export type ServiceResponseType<T> =
  | { success: true; data: T; message?: string; statusCode: number }
  | { success: false; message: string; statusCode: number };

export class ServiceResponse {
  static success<T>(data: T, message?: string): ServiceResponseType<T> {
    return {
      success: true,
      data,
      message,
      statusCode: 200,
    };
  }

  static failed(
    message: string,
    statusCode: number
  ): ServiceResponseType<never> {
    return {
      success: false,
      message,
      statusCode,
    };
  }
}
