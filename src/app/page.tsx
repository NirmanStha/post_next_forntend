"use client";

import React from "react";
import PostsList from "@/components/features/posts/components/posts-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Next.js with Axios API Client
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Professional API integration with TypeScript, React Query, and error
          handling
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚀 Axios Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Full-featured HTTP client with interceptors, automatic token
              handling, and error management
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔄 React Query
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Powerful data fetching with caching, background updates, and
              optimistic mutations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📝 Type Safety
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Full TypeScript integration with Zod validation and type inference
            </p>
          </CardContent>
        </Card>
      </div>

      <PostsList />
    </div>
  );
};

export default Home;
