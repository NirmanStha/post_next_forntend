"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Navigation Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-red-600">
              POSTS - Admin Panel
            </h1>
            <nav className="flex items-center space-x-4">
              <a
                href="/dashboard"
                className="text-sm hover:text-red-600 transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/dashboard/users"
                className="text-sm hover:text-red-600 transition-colors"
              >
                Users
              </a>
              <a
                href="/dashboard/posts"
                className="text-sm hover:text-red-600 transition-colors"
              >
                Posts
              </a>
              <a
                href="/dashboard/settings"
                className="text-sm hover:text-red-600 transition-colors"
              >
                Settings
              </a>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-red-600 hover:text-red-800 hover:bg-red-50"
              >
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-73px)]">{children}</main>
    </div>
  );
}
