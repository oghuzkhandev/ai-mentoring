import { db } from "@/db";
import { cvAnalyses, coverLetters, roadMaps, chatSessions } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "There is no connected user" },
        { status: 401 }
      );
    }

    // === CV Analyses ===
    const cvRows = await db
      .select()
      .from(cvAnalyses)
      .where(eq(cvAnalyses.userId, userId))
      .orderBy(asc(cvAnalyses.createdAt));

    const cvAnalyzed = cvRows.length;

    const validScores = cvRows
      .map((r) => r.score)
      .filter((s): s is number => s !== null && s !== undefined);

    const careerScore =
      validScores.length > 0
        ? Math.round(
            validScores.reduce((a, b) => a + b, 0) / validScores.length
          )
        : 0;

    let daysActive = 1;
    if (cvRows.length > 0) {
      const first = new Date(cvRows[0].createdAt);
      const last = new Date(cvRows[cvRows.length - 1].createdAt);
      const diff = (last.getTime() - first.getTime()) / (1000 * 60 * 60 * 24);
      daysActive = Math.max(1, Math.ceil(diff));
    }

    // === Cover Letters ===
    const coverLettersRows = await db
      .select()
      .from(coverLetters)
      .where(eq(coverLetters.userId, userId));
    const coverLettersCount = coverLettersRows.length;

    // === Roadmaps ===
    const roadMapsRows = await db
      .select()
      .from(roadMaps)
      .where(eq(roadMaps.userId, userId));
    const roadMapsCount = roadMapsRows.length;

    // === AI Chat Sessions ===
    const chatSessionsRows = await db
      .select()
      .from(chatSessions)
      .where(eq(chatSessions.userId, userId));
    const aiChatsCount = chatSessionsRows.length;

    // === Response ===
    return NextResponse.json({
      cvAnalyzed,
      careerScore,
      daysActive,
      coverLetters: coverLettersCount,
      roadmaps: roadMapsCount,
      aiChats: aiChatsCount,
    });
  } catch (error: any) {
    console.error("❌ Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
