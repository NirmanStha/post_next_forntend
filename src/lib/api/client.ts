import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

import { ApiResponse, QueryParams } from "@/types";
import { config } from "zod/v4/core";
import { error } from "console";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
      withCredentials: true,
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
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const orgRequest = error.config as any;
        if (error.response?.status === 401 && !orgRequest?._retry) {
          orgRequest._retry = true;
          try {
            await this.axiosInstance.post("/auth/refresh");
            return this.axiosInstance(orgRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        if (error.response) {
          const { status, data } = error.response;
          throw new ApiError(
            (data as any)?.message || "An error occurred",
            status,
            (data as any)?.errors || undefined
          );
        } else if (error.request) {
          throw new ApiError("No response received from server", 500);
        } else {
          throw new ApiError(error.message, 500);
        }
      }
    );
  }

  async get<T>(url: string, params?: QueryParams): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(url, {
      params,
    });
    return response.data;
  }
  async post<T>(
    url: string,
    data?: any,
    params?: QueryParams
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(url, data, {
      params,
    });
    return response.data;
  }
  async patch<T>(
    url: string,
    data?: any,
    params?: QueryParams
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.patch<ApiResponse<T>>(url, data, {
      params,
    });
    return response.data;
  }
  async delete<T>(url: string, params?: QueryParams): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(url, {
      params,
    });
    return response.data;
  }
  async downloadFile(url: string, filename: string): Promise<void> {
    const res = await this.axiosInstance.get(url, { responseType: "blob" });
    const blob = new Blob([res.data], { type: res.headers["content-type"] });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }
  get axios() {
    return this.axiosInstance;
  }
}

export const apiClient = new ApiClient();
