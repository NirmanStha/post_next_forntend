import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const response = await apiClient.get(API_ENDPOINTS.USERS.PROFILE, body);

    return NextResponse.json({
      success: true,
      data: response.data,
      message: "User profile retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to retrieve user profile",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
