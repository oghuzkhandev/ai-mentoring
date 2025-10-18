import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { roadMaps, userCredits } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userInput, userEmail, userId } = body;

    if (!userInput || !userEmail || !userId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // ✅ 1. Kullanıcının kredilerini kontrol et
    const [credits] = await db
      .select()
      .from(userCredits)
      .where(eq(userCredits.userId, userId));

    if (!credits) {
      return NextResponse.json(
        { success: false, message: "No credit record found." },
        { status: 403 }
      );
    }

    if (credits.roadmapCredits <= 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "🚫 You have no roadmap credits left. Upgrade to Pro to continue.",
        },
        { status: 403 }
      );
    }

    // ✅ 2. Kredi düş
    await db
      .update(userCredits)
      .set({
        roadmapCredits: credits.roadmapCredits - 1,
        updatedAt: new Date(),
      })
      .where(eq(userCredits.userId, userId));

    // ✅ 3. Yeni roadmap kaydı oluştur ve oluşan gerçek ID'yi al
    const [newRoadmap] = await db
      .insert(roadMaps)
      .values({
        userId,
        userEmail,
        userInput,
        status: "processing",
        createdAt: new Date(),
      })
      .returning({
        id: roadMaps.id,
      });

    const roadmapId = newRoadmap.id;

    // ✅ 4. Inngest event'i doğru ID ile gönder
    await inngest.send({
      name: "roadmap/generator.requested",
      data: {
        roadmapId,
        userInput,
        userEmail,
        userId,
      },
    });

    // ✅ 5. Frontend'e gerçek ID ve güncel krediyi dön
    return NextResponse.json({
      success: true,
      message: "✅ Roadmap generation started.",
      roadmapId,
      remainingCredits: credits.roadmapCredits - 1,
    });
  } catch (error) {
    console.error("❌ Roadmap Route Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
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
    console.error("❌ Error fetching roadmap:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
