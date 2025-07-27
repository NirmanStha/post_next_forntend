import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: { postId: string } }
) => {
  try {
    const body = await request.json();
    const response = await apiClient.post(
      API_ENDPOINTS.COMMENTS.CREATE(params.postId),
      body
    );

    return NextResponse.json({
      success: true,
      data: response.data,
      message: "Comment created successfully",
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create comment",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
