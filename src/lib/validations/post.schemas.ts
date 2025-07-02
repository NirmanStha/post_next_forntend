import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  excerpt: z.string().max(200, "Excerpt is too long").optional(),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  published: z.boolean().default(false),
});

export const postFilterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  published: z.boolean().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const postUpdateSchema = postSchema.partial();

export type PostInput = z.infer<typeof postSchema>;
export type PostFilter = z.infer<typeof postFilterSchema>;
export type PostUpdate = z.infer<typeof postUpdateSchema>;
