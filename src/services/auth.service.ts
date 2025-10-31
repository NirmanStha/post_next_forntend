import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/utils/constants";
import { LoginInput, RegisterInput } from "@/lib/validations/auth.schemas";
import { AuthResponse } from "@/types";

/**
 * Authentication service
 * Handles all auth-related API calls from client components
 * Uses the frontend API client to call Next.js API routes
 */
export const authService = {
  /**
   * Login user
   * @param credentials - User email and password
   * @returns Authentication response with user data and tokens
   */
  login: async (credentials: LoginInput) => {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  /**
   * Register new user
   * @param data - User registration data
   * @returns Authentication response with user data and tokens
   */
  register: async (data: RegisterInput) => {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  /**
   * Logout user
   * Clears authentication cookies on the server
   */
  logout: async () => {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  /**
   * Refresh authentication tokens
   * Called automatically by the API client interceptor when token expires
   */
  refresh: async () => {
    return apiClient.post(API_ENDPOINTS.AUTH.REFRESH);
  },
};
