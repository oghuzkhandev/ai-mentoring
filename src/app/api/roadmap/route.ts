import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { roadMaps } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const roadmapId = crypto.randomUUID();
    const { userInput, userEmail, userId } = body;

    if (!userInput || !userEmail || !userId) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    await inngest.send({
      name: "roadmap/generator.requested",
      data: {
        roadmapId,
        userInput,
        userEmail,
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Roadmap generation request sent to AI.",
      roadmapId,
    });
  } catch (error) {
    console.error("Error triggering roadmap generation:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const result = await db
      .select({
        id: roadMaps.id,
        status: roadMaps.status,
        roadmapData: roadMaps.roadmapData,
      })
      .from(roadMaps)
      .where(eq(roadMaps.id, id))
      .limit(1);

    if (!result.length) {
      return NextResponse.json({ status: "processing" });
    }

    const row = result[0];

    return NextResponse.json({
      status: row.status,
      roadmapData: row.roadmapData,
    });
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
