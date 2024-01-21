/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CustomError {
  statusCode: number;
  status: string;
  message?: string;
  stack?: string;
  error?: any;
  isOperational: boolean;
}
