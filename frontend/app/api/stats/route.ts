import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const studentName = searchParams.get("studentName");

  const res = await fetch(
    `${BACKEND_URL}/api/stats?studentName=${studentName}`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${BACKEND_URL}/api/stats`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}
