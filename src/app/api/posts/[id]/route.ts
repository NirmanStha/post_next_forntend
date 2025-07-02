import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // In a real app, you'd delete from your database
    // For now, we'll just simulate a successful deletion

    return NextResponse.json({
      success: true,
      message: `Post with ID ${id} deleted successfully`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete post",
        errors: { general: ["Post not found or could not be deleted"] },
      },
      { status: 404 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Mock single post data
  const mockPost = {
    id,
    title: `Post ${id}`,
    content: `This is the content for post ${id}...`,
    excerpt: `This is the excerpt for post ${id}`,
    category: "tech",
    tags: ["sample", "post"],
    published: true,
    authorId: "1",
    author: {
      id: "1",
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return NextResponse.json({
    success: true,
    data: mockPost,
  });
}
