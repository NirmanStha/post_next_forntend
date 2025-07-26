"use client";

import React from "react";
import PostsList from "@/components/features/posts/components/posts-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PostSubmitForm from "../components/PostSumbitForm";

const UserHome = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center">
        <PostSubmitForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📝 Your Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create, edit and manage your blog posts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              👤 Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Update your profile information and settings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔍 Explore
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Discover posts from other users
            </p>
          </CardContent>
        </Card>
      </div>

      {/* <PostsList /> */}
    </div>
  );
};

export default UserHome;
