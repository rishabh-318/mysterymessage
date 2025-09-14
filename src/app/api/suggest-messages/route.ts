import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, UIMessage } from "ai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be seperated by '||'. Those questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid universal themes that encourage friendly instead on universal theme that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the quesrions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: openai("gpt-4o"),
      maxOutputTokens: 400,
      // messages: convertToModelMessages(messages),
      prompt,
    });

    // Stream back to client
    return result.toUIMessageStreamResponse();
  } catch (err: any) {
    console.error("AI streaming error:", err);

    // Handle known OpenAI / AI SDK errors
    if (err.name === "OpenAIError" || err.name === "AIError") {
      return NextResponse.json(
        {
          error: "OpenAI API Error",
          message: err.message,
          status: err.status ?? 500,
        },
        { status: err.status ?? 500 }
      );
    }

    // Handle aborted requests
    if (err.name === "AbortError") {
      return NextResponse.json(
        {
          error: "Request aborted",
          message: "The request was cancelled by the client.",
        },
        { status: 499 } // non-standard "client closed request"
      );
    }

    // Fallback for unexpected errors
    return NextResponse.json(
      {
        error: "Unexpected Error",
        message: err?.message ?? "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
