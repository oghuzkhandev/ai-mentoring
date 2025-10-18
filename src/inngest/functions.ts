import { inngest } from "@/inngest/client";
import {
  runKankaAgent,
  runCareerAgent,
  analyzeCV,
  generateRoadmap,
  generateCoverLetter,
} from "./agents";
import { db } from "@/db";
import { cvAnalyses, coverLetters, roadMaps } from "@/db/schema";
import { eq } from "drizzle-orm";
import ImageKit from "imagekit";
import { sendPushNotification } from "@/lib/onesignal";
import { NextResponse } from "next/server";

export const chatWithMentorlyCareerAgent = inngest.createFunction(
  { id: "chat-with-mentorly-career-agent" },
  { event: "mentorly/chat.requested" },
  async ({ event, step }) => {
    const { userInput } = event.data;

    const text = await step.run("process-chat", async () => {
      return await runCareerAgent(userInput);
    });

    return {
      success: true,
      response: text,
      timestamp: new Date().toISOString(),
    };
  }
);

export const chatWithKankaAgent = inngest.createFunction(
  { id: "chat-with-kanka-agent" },
  { event: "kanka/chat.requested" },
  async ({ event, step }) => {
    const { userInput } = event.data;

    const text = await step.run("process-kanka-chat", async () => {
      return await runKankaAgent(userInput);
    });

    return {
      success: true,
      response: text,
      timestamp: new Date().toISOString(),
    };
  }
);

const imagekit = new ImageKit({
  //@ts-ignore
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  //@ts-ignore
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  //@ts-ignore
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL,
});

export const analyzeCVWithAI = inngest.createFunction(
  { id: "analyze-cv-with-ai", retries: 3 },
  { event: "cv/analyze.requested" },
  async ({ event, step }) => {
    const { recordId, userId, fileName, base64CVFile, fileUrl, cvText } =
      event.data;

    try {
      if (!cvText || cvText.trim().length < 100) {
        throw new Error("Could not extract enough text from PDF");
      }

      const uploadImageUrl = await step.run("upload-to-imagekit", async () => {
        const imageKitFile = await imagekit.upload({
          file: base64CVFile,
          fileName: `cv-${Date.now()}-${fileName}`,
          folder: `/cvs/${userId}`,
          isPublished: true,
        });
        return imageKitFile.url;
      });

      await step.run("update-file-url", async () => {
        await db
          .update(cvAnalyses)
          .set({ fileUrl: uploadImageUrl })
          .where(eq(cvAnalyses.id, recordId));
      });

      const analysisResult = await step.run("analyze-with-ai", async () => {
        return await analyzeCV(cvText);
      });

      await step.run("save-analysis", async () => {
        await db
          .update(cvAnalyses)
          .set({
            analysis: analysisResult.analysis,
            score: analysisResult.score,
            status: "completed",
          })
          .where(eq(cvAnalyses.id, recordId));
      });

      await step.run("send-push-notification", async () => {
        await sendPushNotification(
          userId,
          "CV Analysis Complete ✅",
          `Your CV has been analyzed successfully. Score: ${analysisResult.score}/100`,
          `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
        );
      });

      return {
        success: true,
        recordId,
        score: analysisResult.score,
        fileUrl,
        status: "completed",
      };
    } catch (error: any) {
      console.error("CV Analysis Error:", {
        message: error.message,
        stack: error.stack,
        recordId,
        userId,
      });
      await db
        .update(cvAnalyses)
        .set({ status: "failed" })
        .where(eq(cvAnalyses.id, recordId))
        .returning();
      throw error;
    }
  }
);

export const RoadMapAgent = inngest.createFunction(
  { id: "generate-roadmap-with-ai" },
  { event: "roadmap/generator.requested" },
  async ({ event, step }) => {
    const { roadmapId, userInput } = event.data;

    const roadmapResult = await step.run("generate-roadmap", async () => {
      return await generateRoadmap(userInput);
    });

    await step.run("update-roadmap-in-db", async () => {
      await db
        .update(roadMaps)
        .set({
          roadmapData: roadmapResult,
          status: "Completed",
          updatedAt: new Date(),
        })
        .where(eq(roadMaps.id, roadmapId));
    });
    return {
      success: true,
      roadmapId,
      roadmap: roadmapResult,
    };
  }
);

export const CoverLetterAgent = inngest.createFunction(
  { id: "generate-coverletter-with-ai" },
  { event: "coverletter/generator.requested" },
  async ({ event, step }) => {
    const { coverLetterId, userEmail, jobDescription } = event.data;

    const coverLetterResult = await step.run(
      "generate-cover-letter",
      async () => {
        return await generateCoverLetter(jobDescription, userEmail);
      }
    );

    await step.run("update-coverletter-in-db", async () => {
      await db
        .update(coverLetters)
        .set({
          content: coverLetterResult,
          status: "completed",
          updatedAt: new Date(),
        })
        .where(eq(coverLetters.id, coverLetterId));
    });

    console.log(`✅ Cover letter generated for user ${userEmail}`);

    return {
      success: true,
      coverLetterId,
      coverLetter: coverLetterResult,
    };
  }
);
