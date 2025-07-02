"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "../services/posts-service";
import { PostInput, PostFilter } from "@/lib/validations/post.schemas";
import { Post } from "@/types/post.types";
import { useToast } from "@/hooks/use-toast";

// Query keys
export const POSTS_QUERY_KEYS = {
  all: ["posts"] as const,
  lists: () => [...POSTS_QUERY_KEYS.all, "list"] as const,
  list: (filters: PostFilter) =>
    [...POSTS_QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...POSTS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...POSTS_QUERY_KEYS.details(), id] as const,
  byAuthor: (authorId: string) =>
    [...POSTS_QUERY_KEYS.all, "author", authorId] as const,
  byCategory: (category: string) =>
    [...POSTS_QUERY_KEYS.all, "category", category] as const,
  search: (query: string) =>
    [...POSTS_QUERY_KEYS.all, "search", query] as const,
};

// Hooks
export const usePosts = (filters?: PostFilter) => {
  return useQuery({
    queryKey: POSTS_QUERY_KEYS.list(filters || { page: 1, limit: 10 }),
    queryFn: () => postsService.getPosts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: POSTS_QUERY_KEYS.detail(id),
    queryFn: () => postsService.getPost(id),
    enabled: !!id,
  });
};

export const usePostsByAuthor = (authorId: string) => {
  return useQuery({
    queryKey: POSTS_QUERY_KEYS.byAuthor(authorId),
    queryFn: () => postsService.getPostsByAuthor(authorId),
    enabled: !!authorId,
  });
};

export const usePostsByCategory = (category: string) => {
  return useQuery({
    queryKey: POSTS_QUERY_KEYS.byCategory(category),
    queryFn: () => postsService.getPostsByCategory(category),
    enabled: !!category,
  });
};

export const useSearchPosts = (query: string) => {
  return useQuery({
    queryKey: POSTS_QUERY_KEYS.search(query),
    queryFn: () => postsService.searchPosts(query),
    enabled: !!query && query.length > 2,
  });
};

// Mutations
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: PostInput) => postsService.createPost(data),
    onSuccess: (newPost) => {
      // Invalidate posts queries
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEYS.lists() });

      toast({
        title: "Success",
        description: "Post created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create post",
        variant: "destructive",
      });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PostInput> }) =>
      postsService.updatePost(id, data),
    onSuccess: (updatedPost) => {
      // Update the post in cache
      queryClient.setQueryData(
        POSTS_QUERY_KEYS.detail(updatedPost.id),
        updatedPost
      );

      // Invalidate posts lists
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEYS.lists() });

      toast({
        title: "Success",
        description: "Post updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update post",
        variant: "destructive",
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => postsService.deletePost(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: POSTS_QUERY_KEYS.detail(deletedId),
      });

      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEYS.lists() });

      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete post",
        variant: "destructive",
      });
    },
  });
};

export const usePublishPost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => postsService.publishPost(id),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(
        POSTS_QUERY_KEYS.detail(updatedPost.id),
        updatedPost
      );
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEYS.lists() });

      toast({
        title: "Success",
        description: "Post published successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to publish post",
        variant: "destructive",
      });
    },
  });
};

export const useUploadPostImage = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      file,
      onProgress,
    }: {
      file: File;
      onProgress?: (progress: number) => void;
    }) => postsService.uploadPostImage(file, onProgress),
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    },
  });
};
