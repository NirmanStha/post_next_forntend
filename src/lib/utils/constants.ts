export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  POSTS: {
    LIST: "/posts",
    CREATE: "/posts/upload",
    DETAIL: (id: string) => `/posts/${id}`,
    UPDATE: (id: string) => `/posts/${id}`,
    DELETE: (id: string) => `/posts/${id}`,
  },
  USERS: {
    LIST: "/user",
    PROFILE: "/user/profile",
    DETAIL: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    USERPROFILE: (id: string) => `/users/${id}`,
  },
  COMMENTS: {
    LIST: (postId: string) => `/posts/${postId}/comments`,
    CREATE: (postId: string) => `/posts/${postId}/comments`,
    UPDATE: (commentId: string) => `/comments/${commentId}`,
    DELETE: (commentId: string) => `/comments/${commentId}`,
  },
} as const;

export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  ADMIN: {
    ROOT: "/admin",
    USERS: "/admin/users",
    POSTS: "/admin/posts",
    ANALYTICS: "/admin/analytics",
  },
  USER: {
    ROOT: "/user",
    PROFILE: "/user/profile",
    POSTS: "/user/posts",
  },
  POSTS: {
    LIST: "/posts",
    DETAIL: (id: string) => `/posts/${id}`,
    CREATE: "/posts/upload",
    EDIT: (id: string) => `/posts/${id}/edit`,
  },
} as const;

// export const ROLES = {
//   ADMIN: "admin",
//   USER: "user",
// } as const;

export const POST_CATEGORIES = [
  { value: "technology", label: "Technology" },
  { value: "business", label: "Business" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
] as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;
