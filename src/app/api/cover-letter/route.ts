import { NextResponse } from "next/server";
import { db } from "@/db";
import { inngest } from "@/inngest/client";
import { coverLetters } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { userId, userEmail, jobDescription } = await req.json();

    if (!userId || !userEmail || !jobDescription) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
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
      message: "Cover letter generation started",
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
