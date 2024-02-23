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

    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthroized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI Key not Config", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Message are requried", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      messages: [messages],
      model: "gpt-3.5-turbo",
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR}", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}