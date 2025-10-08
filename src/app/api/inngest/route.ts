import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  analyzeCVWithAI,
  chatWithMentorlyCareerAgent,
  chatWithKankaAgent,
  CoverLetterAgent,
  RoadMapAgent,
} from "../../../inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    chatWithMentorlyCareerAgent,
    chatWithKankaAgent,
    analyzeCVWithAI,
    RoadMapAgent,
    CoverLetterAgent,
  ],
});
