import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

class BackendApiClient {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_BACKEND_API_BASE_URL || "/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.setupInterceptors();
  }
  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => config,
      async (error: AxiosError) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        console.error("API Error:", error);
        return Promise.reject(error);
      }
    );
  }
  async get<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.get<T>(url, { params });
    return response;
  }
  async post<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.post<T>(url, data);
    return response;
  }

  async put<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.put<T>(url, data);
    return response;
  }
  async patch<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.patch<T>(url, data);
    return response;
  }
  async delete<T>(url: string): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.delete<T>(url);
    return response;
  }
}
export const apiClient = new BackendApiClient();
