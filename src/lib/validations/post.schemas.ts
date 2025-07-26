import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z
    .string()
    .min(2, "Content must be at least 2 characters")
    .optional(),
  filenames: z.array(z.string()).min(1, "At least one image is required"),
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
