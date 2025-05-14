import { connectDB } from "@/lib/db";
import { getSystemContext } from "@/lib/systemContext";
import { Issue, User } from "@/models";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText, smoothStream, generateText, generateObject } from "ai";
import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const openrouter = createOpenRouter({
  apiKey:
    "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",
});

export async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();
  const body = await req.json();
  const authHeader = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (authHeader) {
    const decoded: any = await jwtVerify(
      authHeader,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    const user = await User.findById(decoded.payload.id);

    if (user) {
      const previousIssues = await Issue.find({ sender: user?._id });

      const { text } = await generateText({
        model: openrouter("nousresearch/deephermes-3-mistral-24b-preview:free"),
        prompt: "Generate response to the application",
        system: getSystemContext(
          `Region: ${body.district}, Category: ${body.category}, Content: ${body.content}`,
          previousIssues
            .map(
              (item) =>
                `Region: ${item.district}, Category: ${item.category}, Content: ${item.content}, Response: ${item.response}`
            )
            .join("\n============================\n")
        ),
      });
      const newIssue = new Issue({
        response: text,
        category: body.category,
        content: body.content,
        district: body.district,
        sender: user._id,
      });
      await newIssue.save();
      return NextResponse.json(newIssue, { status: 201 });
    }
  } else {
    return NextResponse.json("Nooo", { status: 401 });
  }

  return NextResponse.json({});
}

export async function GET(req: NextRequest, res: NextResponse) {
  await connectDB();
  const authHeader = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (authHeader) {
    const decoded: any = await jwtVerify(
      authHeader,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    const user = await User.findById(decoded.payload.id);

    if (user) {
      const issues = await Issue.find({ sender: user?._id });

      return NextResponse.json(issues, { status: 201 });
    }
  } else {
    return NextResponse.json("Nooo", { status: 401 });
  }

  return NextResponse.json({});
}
