import { NextResponse } from "next/server";
import { db } from "@/db";
import { chatMessages, chatSessions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { runCareerAgent } from "@/inngest/agents";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, userInput, sessionId } = body;

    if (!userInput?.trim()) {
      return NextResponse.json(
        { error: "userInput required" },
        { status: 400 }
      );
    }

    let session = sessionId;

    if (session) {
      const existing = await db
        .select()
        .from(chatSessions)
        .where(eq(chatSessions.id, session));

      if (existing.length === 0) {
        const [newSession] = await db
          .insert(chatSessions)
          .values({
            id: session,
            userId,
            category: "career",
            title: userInput.slice(0, 30) || "Yeni Sohbet",
          })
          .returning({ id: chatSessions.id });

        session = newSession.id;
      }
    }

    if (!session) {
      const [newSession] = await db
        .insert(chatSessions)
        .values({
          id: uuidv4(),
          userId,
          category: "career",
          title: userInput.slice(0, 30) || "Yeni Sohbet",
        })
        .returning({ id: chatSessions.id });

      session = newSession.id;
    }

    await db.insert(chatMessages).values({
      sessionId: session,
      sender: "user",
      message: userInput,
    });

    const aiResponse = await runCareerAgent(userInput);

    await db.insert(chatMessages).values({
      sessionId: session,
      sender: "ai",
      message: aiResponse,
    });

    return NextResponse.json({
      sessionId: session,
      response: aiResponse,
    });
  } catch (error) {
    console.error("❌ /api/chat-bot error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
