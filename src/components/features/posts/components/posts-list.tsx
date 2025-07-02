"use client";

import React from "react";
import { usePosts, useCreatePost, useDeletePost } from "../hooks/use-posts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Trash2 } from "lucide-react";

const PostsList = () => {
  const {
    data: postsData,
    isLoading,
    error,
  } = usePosts({
    page: 1,
    limit: 10,
    published: true,
  });

  const createPostMutation = useCreatePost();
  const deletePostMutation = useDeletePost();

  const handleCreatePost = () => {
    createPostMutation.mutate({
      title: "New Post " + Date.now(),
      content: "This is a new post created with Axios!",
      category: "tech",
      published: false,
    });
  };

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePostMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Error loading posts: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Posts</h2>
        <Button
          onClick={handleCreatePost}
          disabled={createPostMutation.isPending}
        >
          {createPostMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          Create Post
        </Button>
      </div>

      <div className="grid gap-4">
        {postsData?.data.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{post.title}</CardTitle>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeletePost(post.id)}
                disabled={deletePostMutation.isPending}
              >
                {deletePostMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">
                {post.excerpt || post.content.substring(0, 100) + "..."}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Category: {post.category}</span>
                <span>By: {post.author.name}</span>
                <span>{post.published ? "Published" : "Draft"}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {postsData?.pagination && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <span className="text-sm text-gray-600">
            Page {postsData.pagination.page} of{" "}
            {postsData.pagination.totalPages}
          </span>
        </div>
      )}
    </div>
  );
};

export default PostsList;
