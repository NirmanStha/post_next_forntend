import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(500, "Bio is too long").optional(),
  avatar: z.string().url("Invalid avatar URL").optional(),
});

export const userUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  bio: z.string().max(500, "Bio is too long").optional(),
  avatar: z.string().url("Invalid avatar URL").optional(),
  role: z.enum(["admin", "user"]).optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
