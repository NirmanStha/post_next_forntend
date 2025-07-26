"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header/Header";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="min-h-[calc(100vh-73px)]">{children}</main>
    </div>
  );
}
