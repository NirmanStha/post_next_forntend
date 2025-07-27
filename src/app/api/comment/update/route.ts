import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await request.json();
    const response = await apiClient.patch(
      API_ENDPOINTS.COMMENTS.UPDATE(params.id),
      body
    );

    return NextResponse.json({
      success: true,
      data: response.data,
      message: "Comment updated successfully",
    });
  } catch (error) {
    console.error("Comment update error:", error);
    return NextResponse.json({
      success: false,
      message: "Comment update failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
