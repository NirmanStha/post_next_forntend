// export interface Post {
//   id: string;
//   title: string;
//   content: string;
//   excerpt?: string;
//   category: string;
//   tags: string[];
//   published: boolean;
//   authorId: string;
//   author: {
//     id: string;
//     name: string;
//     avatar?: string;
//   };
//   createdAt: Date;
//   updatedAt: Date;

import { User } from "./auth.types";

// }
export interface Post {
  id: string;
  title: string;
  content: string;
  filenames: string[];
  createdAt: Date;
  updatedAt: Date;
  user: Partial<User>;
}

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreatePostData {
  title: string;
  content: string;
  posts?: string[];
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}

export interface Options {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}
