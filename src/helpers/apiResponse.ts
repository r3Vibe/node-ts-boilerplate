class ApiResponse {
  data: object;
  message: string;
  constructor(data: object, message: string) {
    this.data = data;
    this.message = message;
  }
}
export default ApiResponse;
