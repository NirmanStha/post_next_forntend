import { apiClient } from "@/lib/api/backendApiClient";
import { API_ENDPOINTS } from "@/lib/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const response = await apiClient.get(API_ENDPOINTS.USERS.USERPROFILE(id));

    return NextResponse.json({
      success: true,
      data: response.data,
      message: "User profile retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve user profile",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
