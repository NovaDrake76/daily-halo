import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const CORRECT_PASSWORD = process.env.ADMIN_PASSWORD;

    if (password === CORRECT_PASSWORD) {
      const response = NextResponse.json({ success: true }, { status: 200 });

      response.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid Password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
