import { db } from "@/db";
import {
  cvAnalyses,
  coverLetters,
  roadMaps,
  chatSessions,
  userCredits,
} from "@/db/schema";
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

    // Kullanıcının kredi kaydı yoksa otomatik oluştur (ilk girişte hata almamak için)
    let [credits] = await db
      .select()
      .from(userCredits)
      .where(eq(userCredits.userId, userId));

    if (!credits) {
      await db.insert(userCredits).values({
        userId,
        coverLetterCredits: 5,
        roadmapCredits: 3,
        cvAnalysisCredits: 0,
        isPro: false,
      });
      [credits] = await db
        .select()
        .from(userCredits)
        .where(eq(userCredits.userId, userId));
    }

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

    const coverLettersRows = await db
      .select()
      .from(coverLetters)
      .where(eq(coverLetters.userId, userId));
    const coverLettersCount = coverLettersRows.length;

    const roadMapsRows = await db
      .select()
      .from(roadMaps)
      .where(eq(roadMaps.userId, userId));
    const roadMapsCount = roadMapsRows.length;

    const chatSessionsRows = await db
      .select()
      .from(chatSessions)
      .where(eq(chatSessions.userId, userId));
    const aiChatsCount = chatSessionsRows.length;

    const remainingCredits = {
      coverLetter: credits?.coverLetterCredits ?? 0,
      roadmap: credits?.roadmapCredits ?? 0,
      cvAnalysis: credits?.cvAnalysisCredits ?? 0,
      isPro: credits?.isPro ?? false,
    };

    return NextResponse.json({
      cvAnalyzed,
      careerScore,
      daysActive,
      coverLetters: coverLettersCount,
      roadmaps: roadMapsCount,
      aiChats: aiChatsCount,
      credits: remainingCredits,
    });
  } catch (error: any) {
    console.error("❌ Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
