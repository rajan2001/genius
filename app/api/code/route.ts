import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instruction: ChatCompletionMessageParam = {
  role: "system",
  content:
    "You are a Code Generator. You must answer only in markdown code snippets. Use code comments for explanations",
};

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
      messages: [instruction, messages],
      model: "gpt-3.5-turbo",
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR}", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
