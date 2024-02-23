import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { username , resolution = "512*512" , amount = 1 } = body;

    if (!userId) {
      return new NextResponse("Unauthroized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI Key not Config", { status: 500 });
    }

    if (!username) {
      return new NextResponse("username are requried", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("resolution are requried", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("amount are requried", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      messages: [username,resolution,amount],
      model: "gpt-3.5-turbo",
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR}", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
