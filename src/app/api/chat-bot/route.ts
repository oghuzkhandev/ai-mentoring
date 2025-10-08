import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userInput } = await req.json();

    if (!userInput?.trim()) {
      return NextResponse.json({ error: "userInput required" }, { status: 400 });
    }

    const resultIds = await inngest.send({
      name: "mentorly/chat.requested",
      data: { userInput },
    });

    const runId = resultIds.ids[0];
    let attempts = 0;

    while (attempts < 60) {
      const result = await fetch(
        `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,
        {
          headers: {
            Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
          },
        }
      );

      const data = await result.json();

      if (data?.data?.[0]?.status === "Completed") {
        return NextResponse.json(data);
      }

      if (data?.data?.[0]?.status === "Failed") {
        return NextResponse.json({ error: "Agent failed" }, { status: 500 });
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      attempts++;
    }

    return NextResponse.json({ error: "Timeout" }, { status: 500 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}