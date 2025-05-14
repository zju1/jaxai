import { connectDB } from "@/lib/db";
import { Issue } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const authHeader = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (authHeader) {
    const issues = await Issue.find().populate("sender");

    return NextResponse.json(issues, { status: 201 });
  } else {
    return NextResponse.json("Nooo", { status: 401 });
  }
}
