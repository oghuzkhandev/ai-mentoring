import { inngest } from "@/inngest/client";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { cvAnalyses } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
// @ts-ignore
import extract from "pdf-text-extract";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("cv") as File | null;
    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    if (file.type !== "application/pdf")
      return NextResponse.json(
        { error: "Only PDF files allowed" },
        { status: 400 }
      );
    if (file.size > 5 * 1024 * 1024)
      return NextResponse.json(
        { error: "Max 5MB file size allowed" },
        { status: 400 }
      );

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const tempPath = path.join("/tmp", `${Date.now()}-${file.name}`);
    fs.writeFileSync(tempPath, buffer);

    const cvText = await new Promise<string>((resolve, reject) => {
      extract(tempPath, (err: any, pages: string[]) => {
        if (err) reject(err);
        else resolve(pages.join("\n"));
      });
    });

    if (!cvText || cvText.trim().length < 100)
      throw new Error("Could not extract enough text from PDF");

    const base64CVFile = buffer.toString("base64");

    const [record] = await db
      .insert(cvAnalyses)
      .values({
        userId,
        fileName: file.name,
        fileSize: file.size,
        status: "uploading",
      })
      .returning();

    await inngest.send({
      name: "cv/analyze.requested",
      data: {
        recordId: record.id,
        userId,
        fileName: file.name,
        base64CVFile,
        cvText,
      },
    });

    await db
      .update(cvAnalyses)
      .set({ status: "pending" })
      .where(eq(cvAnalyses.id, record.id));

    return NextResponse.json({
      success: true,
      recordId: record.id,
      message: "CV uploaded & parsed successfully. Analysis started.",
    });
  } catch (error: any) {
    console.error("POST /cv-analyze error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const recordId = searchParams.get("id");

    if (recordId) {
      const [analysis] = await db
        .select()
        .from(cvAnalyses)
        .where(and(eq(cvAnalyses.id, recordId), eq(cvAnalyses.userId, userId)));

      if (!analysis)
        return NextResponse.json({ error: "Not found" }, { status: 404 });

      return NextResponse.json(analysis);
    }

    const analyses = await db
      .select()
      .from(cvAnalyses)
      .where(eq(cvAnalyses.userId, userId))
      .orderBy(desc(cvAnalyses.createdAt));

    return NextResponse.json(analyses);
  } catch (error: any) {
    console.error("GET /cv-analyze error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch analyses" },
      { status: 500 }
    );
  }
}
