import { NextResponse } from "next/server";
import { db } from "@/db";
import { userCredits, coverLetters } from "@/db/schema";
import { eq } from "drizzle-orm";
import { inngest } from "@/inngest/client";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { userEmail, jobDescription } = await req.json();

    if (!userId || !userEmail || !jobDescription) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const [credits] = await db
      .select()
      .from(userCredits)
      .where(eq(userCredits.userId, userId));

    if (!credits) {
      return NextResponse.json(
        { success: false, message: "No credit record found" },
        { status: 403 }
      );
    }

    if (!credits.isPro && credits.coverLetterCredits <= 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You have no remaining cover letter credits. Upgrade to Pro to continue.",
        },
        { status: 403 }
      );
    }

    if (!credits.isPro) {
      await db
        .update(userCredits)
        .set({
          coverLetterCredits: credits.coverLetterCredits - 1,
          updatedAt: new Date(),
        })
        .where(eq(userCredits.userId, userId));
    }

    const [newCoverLetter] = await db
      .insert(coverLetters)
      .values({
        userId,
        userEmail,
        jobDescription,
        status: "processing",
        createdAt: new Date(),
      })
      .returning({ id: coverLetters.id });

    await inngest.send({
      name: "coverletter/generator.requested",
      data: {
        coverLetterId: newCoverLetter.id,
        userId,
        userEmail,
        jobDescription,
      },
    });

    return NextResponse.json({
      success: true,
      coverLetterId: newCoverLetter.id,
      message: "Cover letter generation started. 1 credit has been used.",
    });
  } catch (error: any) {
    console.error("❌ Cover Letter Route Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const [record] = await db
    .select()
    .from(coverLetters)
    .where(eq(coverLetters.id, id));

  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: record.id,
    status: record.status,
    content: record.content ?? null,
    updatedAt: record.updatedAt,
  });
}
