import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "ai-mentoring-app",
  eventKey: process.env.INNGEST_EVENT_KEY,
});
