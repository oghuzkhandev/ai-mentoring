import { NextResponse } from "next/server";
import { db } from "@/db";
import { chatSessions, chatMessages } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const sessions = await db
      .select()
      .from(chatSessions)
      .where(eq(chatSessions.userId, userId))
      .orderBy(desc(chatSessions.createdAt));

    const sessionsWithMessages = await Promise.all(
      sessions.map(async (session) => {
        const messages = await db
          .select()
          .from(chatMessages)
          .where(eq(chatMessages.sessionId, session.id))
          .orderBy(chatMessages.createdAt);

        return {
          id: session.id,
          title: session.title,
          mode: session.category === "career" ? "career" : "kanka",
          createdAt: session.createdAt,
          messages: messages.map((m) => ({
            id: m.id,
            role: m.sender === "user" ? "user" : "assistant",
            content: m.message,
          })),
        };
      })
    );

    return NextResponse.json(sessionsWithMessages);
  } catch (error) {
    console.error("❌ /api/chat/load error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
