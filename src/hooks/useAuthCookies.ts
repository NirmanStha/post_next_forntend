import { NextResponse } from "next/server";

export const useAuthCookies = () => {
  const setCookies = (
    response: NextResponse,
    token: { accessToken: string; refreshToken: string }
  ) => {
    response.cookies.set("accessToken", token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 1, // 1 day
    });
    response.cookies.set("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  };

  const clearCookies = (response: NextResponse) => {
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
  };

  return {
    setCookies,
    clearCookies,
  };
};
