import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/utils/constants";
import { RefreshTokenResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await apiClient.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      body
    );

    const { accessToken, refreshToken } = response.data;

    const nextResponse = NextResponse.json({
      success: true,
      accessToken,
      refreshToken,
      message: "Token refreshed successfully",
    });

    nextResponse.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 1, // 1 day
    });

    nextResponse.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return nextResponse;
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to refresh token",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
