import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/utils/constants";
import { AuthResponse } from "@/types";

import { NextRequest, NextResponse } from "next/server";
import { useAuthCookies } from "@/hooks/useAuthCookies";
export async function POST(request: NextRequest) {
  const { setCookies } = useAuthCookies();
  try {
    const body = await request.json();
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      body
    );

    const { accessToken, refreshToken } = response.data;

    const nextResponse = NextResponse.json({
      success: true,
      data: response.data,
      accessToken,
      refreshToken,
      message: "Login successful",
    });
    setCookies(nextResponse, { accessToken, refreshToken });
    return nextResponse;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({
      success: false,
      message: "Login failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
