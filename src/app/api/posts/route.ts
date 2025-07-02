import { NextRequest, NextResponse } from "next/server";

// Mock posts data
const mockPosts = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    content:
      "Next.js is a React framework that makes building web applications easier...",
    excerpt:
      "Learn the basics of Next.js and how to get started building modern web applications.",
    category: "tech",
    tags: ["nextjs", "react", "javascript"],
    published: true,
    authorId: "1",
    author: {
      id: "1",
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Mastering Axios for API Calls",
    content:
      "Axios is a powerful HTTP client for making API requests in JavaScript...",
    excerpt:
      "Learn how to use Axios effectively for all your API communication needs.",
    category: "tech",
    tags: ["axios", "api", "javascript"],
    published: true,
    authorId: "2",
    author: {
      id: "2",
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "3",
    title: "TypeScript Best Practices",
    content: "TypeScript brings type safety to JavaScript development...",
    excerpt:
      "Discover the best practices for writing clean, maintainable TypeScript code.",
    category: "tech",
    tags: ["typescript", "javascript", "development"],
    published: false,
    authorId: "1",
    author: {
      id: "1",
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const published = searchParams.get("published");

  let filteredPosts = [...mockPosts];

  // Apply filters
  if (search) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    filteredPosts = filteredPosts.filter((post) => post.category === category);
  }

  if (published !== null) {
    const isPublished = published === "true";
    filteredPosts = filteredPosts.filter(
      (post) => post.published === isPublished
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);

  return NextResponse.json({
    success: true,
    data: paginatedPosts,
    pagination: {
      page,
      limit,
      total: totalPosts,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newPost = {
      id: (mockPosts.length + 1).toString(),
      ...body,
      author: {
        id: "1",
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockPosts.push(newPost);

    return NextResponse.json({
      success: true,
      data: newPost,
      message: "Post created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create post",
        errors: { general: ["Invalid request data"] },
      },
      { status: 400 }
    );
  }
}
