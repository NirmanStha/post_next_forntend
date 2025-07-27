import { apiClient } from "@/lib/api/backendApiClient";
import { API_ENDPOINTS } from "@/lib/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, body);

    return NextResponse.json({
      success: true,
      data: res.data,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({
      success: false,
      message: "Registration failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
