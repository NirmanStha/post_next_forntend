import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/utils/constants";
import { Options } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, options: Options) {
  try {
    const body = await request.json();
    const defaultOptions = {
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
    };
    const finalOptions =
      options && Object.keys(options).length > 0 ? options : defaultOptions;
    const response = await apiClient.get(
      API_ENDPOINTS.POSTS.LIST,
      body,
      finalOptions
    );

    return NextResponse.json({
      success: true,
      data: response.data,
      message: "Posts retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving posts:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to retrieve posts",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
