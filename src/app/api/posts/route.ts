import { apiClient } from "@/lib/api/backendApiClient";
import { API_ENDPOINTS } from "@/lib/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters from URL
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const search = searchParams.get("search") || undefined;

    const options = {
      page,
      limit,
      sortBy,
      sortOrder: sortOrder as "asc" | "desc",
      ...(search && { search }),
    };

    const response = await apiClient.get(API_ENDPOINTS.POSTS.LIST, options);

    return NextResponse.json({
      success: true,
      data: response.data,
      message: "Posts retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving posts:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve posts",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
