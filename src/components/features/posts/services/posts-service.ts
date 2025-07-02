import { apiClient } from "@/lib/api/client";
import { ApiResponse, PaginatedResponse } from "@/types";
import { Post } from "@/types/post.types";
import { PostInput, PostFilter } from "@/lib/validations/post.schemas";

export const postsService = {
  async getPosts(filters?: PostFilter): Promise<PaginatedResponse<Post>> {
    const response = await apiClient.get<PaginatedResponse<Post>>(
      "/posts",
      filters
    );
    return response.data;
  },

  async getPost(id: string): Promise<Post> {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  },

  async createPost(postData: PostInput): Promise<Post> {
    const response = await apiClient.post<Post>("/posts", postData);
    return response.data;
  },

  async updatePost(id: string, postData: Partial<PostInput>): Promise<Post> {
    const response = await apiClient.put<Post>(`/posts/${id}`, postData);
    return response.data;
  },

  async deletePost(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(
      `/posts/${id}`
    );
    return response.data;
  },

  async publishPost(id: string): Promise<Post> {
    const response = await apiClient.patch<Post>(`/posts/${id}/publish`);
    return response.data;
  },

  async unpublishPost(id: string): Promise<Post> {
    const response = await apiClient.patch<Post>(`/posts/${id}/unpublish`);
    return response.data;
  },

  async uploadPostImage(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<{ url: string }> {
    const response = await apiClient.uploadFile<{ url: string }>(
      "/posts/upload-image",
      file,
      onProgress
    );
    return response.data;
  },

  async getPostsByAuthor(authorId: string): Promise<Post[]> {
    const response = await apiClient.get<Post[]>(`/posts/author/${authorId}`);
    return response.data;
  },

  async getPostsByCategory(category: string): Promise<Post[]> {
    const response = await apiClient.get<Post[]>(`/posts/category/${category}`);
    return response.data;
  },

  async searchPosts(query: string): Promise<Post[]> {
    const response = await apiClient.get<Post[]>("/posts/search", { q: query });
    return response.data;
  },
};
