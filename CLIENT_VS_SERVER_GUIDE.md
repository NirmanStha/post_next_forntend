# 🎓 CLIENT vs SERVER - QUICK REFERENCE GUIDE

This guide helps you decide when to use `"use client"` in your Next.js App Router project.

---

## 🤔 DECISION FLOWCHART

```
┌─────────────────────────────────────────┐
│  Is it an API route (route.ts)?         │
│  Location: src/app/api/**/route.ts      │
└─────────────┬───────────────────────────┘
              │
         YES  │  NO
              ▼
    ┌─────────────────┐
    │  SERVER ONLY    │
    │  ❌ Never use   │
    │  "use client"   │
    └─────────────────┘
              │
              │
              ▼
    ┌──────────────────────────────────────┐
    │  Does it use React hooks?             │
    │  (useState, useEffect, useQuery,      │
    │   useForm, useRouter, etc.)           │
    └─────────────┬────────────────────────┘
                  │
             YES  │  NO
                  ▼
        ┌──────────────────┐
        │  CLIENT          │
        │  ✅ Add          │
        │  "use client"    │
        └──────────────────┘
                  │
                  │
                  ▼
        ┌──────────────────────────────────┐
        │  Does it have event handlers?     │
        │  (onClick, onChange, onSubmit)    │
        └─────────────┬────────────────────┘
                      │
                 YES  │  NO
                      ▼
            ┌──────────────────┐
            │  CLIENT          │
            │  ✅ Add          │
            │  "use client"    │
            └──────────────────┘
                      │
                      │
                      ▼
            ┌─────────────────────────────────┐
            │  Does it use browser APIs?       │
            │  (window, localStorage, etc.)    │
            └─────────────┬───────────────────┘
                          │
                     YES  │  NO
                          ▼
                ┌──────────────────┐
                │  CLIENT          │
                │  ✅ Add          │
                │  "use client"    │
                └──────────────────┘
                          │
                          │
                          ▼
                ┌─────────────────────────────────┐
                │  Only renders static content?    │
                └─────────────┬───────────────────┘
                              │
                          YES │
                              ▼
                    ┌──────────────────┐
                    │  SERVER          │
                    │  ❌ No need for  │
                    │  "use client"    │
                    └──────────────────┘
```

---

## 📋 COMMON SCENARIOS

### ✅ CLIENT COMPONENTS (Add `"use client"`)

#### **1. Forms**

```typescript
"use client";

import { useForm } from 'react-hook-form';

export default function MyForm() {
  const form = useForm(); // Hook
  return <form onSubmit={...}>...</form>; // Event handler
}
```

#### **2. Interactive Buttons**

```typescript
"use client";

export default function Button() {
  return <button onClick={() => alert("Hi")}>Click</button>;
}
```

#### **3. State Management**

```typescript
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
```

#### **4. TanStack Query**

```typescript
"use client";

import { useQuery } from '@tanstack/react-query';

export default function Posts() {
  const { data } = useQuery({ ... });
  return <div>{...}</div>;
}
```

#### **5. Browser APIs**

```typescript
"use client";

export default function LocalStorage() {
  const save = () => {
    localStorage.setItem("key", "value");
  };
  return <button onClick={save}>Save</button>;
}
```

#### **6. Context Providers**

```typescript
"use client";

import { createContext, useState } from "react";

export const MyContext = createContext();

export function MyProvider({ children }) {
  const [state, setState] = useState();
  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
}
```

---

### ❌ SERVER COMPONENTS (No `"use client"`)

#### **1. API Routes**

```typescript
// ❌ NEVER add "use client" here
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello" });
}
```

#### **2. Data Fetching (Server)**

```typescript
// No "use client" needed
async function Posts() {
  const res = await fetch('https://api.example.com/posts');
  const data = await res.json();

  return <div>{data.map(...)}</div>;
}
```

#### **3. Database Queries**

```typescript
// No "use client" needed
import { prisma } from '@/lib/db';

async function Users() {
  const users = await prisma.user.findMany();
  return <div>{users.map(...)}</div>;
}
```

#### **4. Static Content**

```typescript
// No "use client" needed
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We are a company...</p>
    </div>
  );
}
```

#### **5. Middleware**

```typescript
// ❌ NEVER add "use client" here
import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.next();
}
```

---

## 🔍 YOUR PROJECT FILES

### **CLIENT** (`"use client"` required)

| File                                           | Why?                            |
| ---------------------------------------------- | ------------------------------- |
| `src/app/(user)/login/page.tsx`                | useForm, useMutation, useRouter |
| `src/app/(user)/home/page.tsx`                 | Renders client components       |
| `src/app/(user)/components/PostSubmitForm.tsx` | useState, useRef, onChange      |
| `src/app/(admin)/layout.tsx`                   | onClick handlers                |
| `src/components/header/Header.tsx`             | Interactive Radix UI components |
| `src/components/providers/query-provider.tsx`  | useState, QueryClientProvider   |

### **SERVER** (No `"use client"`)

| File                          | Why?                         |
| ----------------------------- | ---------------------------- |
| All `src/app/api/**/route.ts` | API routes are always server |
| `src/middleware.ts`           | Middleware is always server  |

### **UTILITIES** (Context-dependent)

| File                              | Used In           | Directive? |
| --------------------------------- | ----------------- | ---------- |
| `src/services/auth.service.ts`    | Client components | ❌ No      |
| `src/lib/api/client.ts`           | Client components | ❌ No      |
| `src/lib/api/backendApiClient.ts` | API routes        | ❌ No      |

---

## 🎯 QUICK TIPS

### **Tip 1: Start with Server**

Default to server components. Only add `"use client"` when you need:

- Hooks
- Event handlers
- Browser APIs

### **Tip 2: Keep Client Boundary Small**

```typescript
// ❌ DON'T: Make entire page client
"use client";

export default function Page() {
  return (
    <div>
      <Header />
      <Content />
      <InteractiveButton /> {/* Only this needs to be client */}
    </div>
  );
}

// ✅ DO: Keep client boundary small
export default function Page() {
  return (
    <div>
      <Header />
      <Content />
      <InteractiveButton /> {/* This is a client component */}
    </div>
  );
}
```

### **Tip 3: API Routes = Always Server**

Never add `"use client"` to API routes. They run on the server only.

### **Tip 4: Services Are Just Functions**

Services don't need `"use client"`. They're imported and used in the appropriate context.

---

## 🚨 COMMON MISTAKES

### **Mistake 1: Hooks in API Routes**

```typescript
// ❌ WRONG
export async function POST(request) {
  const { setCookies } = useAuthCookies(); // Error!
}

// ✅ CORRECT
export async function POST(request) {
  response.cookies.set("token", value);
}
```

### **Mistake 2: Making Everything Client**

```typescript
// ❌ WRONG: Unnecessary
"use client";

export default function StaticPage() {
  return <div>Hello World</div>;
}

// ✅ CORRECT: Keep as server
export default function StaticPage() {
  return <div>Hello World</div>;
}
```

### **Mistake 3: Using Wrong API Client**

```typescript
// ❌ WRONG: Frontend client in API route
// src/app/api/posts/route.ts
import { apiClient } from "@/lib/api/client";

// ✅ CORRECT: Backend client in API route
// src/app/api/posts/route.ts
import { apiClient } from "@/lib/api/backendApiClient";
```

---

## 📚 LEARN MORE

- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [When to use Server vs Client](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

---

## ✅ CHECKLIST

Before adding `"use client"`, ask:

- [ ] Does it use React hooks? → Yes = Client
- [ ] Does it have event handlers? → Yes = Client
- [ ] Does it use browser APIs? → Yes = Client
- [ ] Is it an API route? → Always Server (no directive)
- [ ] Is it middleware? → Always Server (no directive)
- [ ] Only static content? → Server (no directive)

**Remember:** When in doubt, start with server. Add `"use client"` only when necessary!
