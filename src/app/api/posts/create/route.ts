import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/utils/constants";
import { CreatePostData } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await apiClient.post<CreatePostData>(
      API_ENDPOINTS.POSTS.CREATE,
      body
    );

    return NextResponse.json({
      success: true,
      data: response.data,
      message: "Post created successfully",
    });
  } catch (error) {
    console.error("Post creation error:", error);
    return NextResponse.json({
      success: false,
      message: "Post creation failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
