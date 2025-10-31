import { apiClient } from "@/lib/api/backendApiClient";
import { API_ENDPOINTS } from "@/lib/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const response = await apiClient.patch(
      API_ENDPOINTS.POSTS.UPDATE(params.id),
      body
    );

    return NextResponse.json({
      success: true,
      data: response.data,
      message: "Post updated successfully",
    });
  } catch (error) {
    console.error("Post update error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Post update failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
