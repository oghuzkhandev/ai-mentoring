import {
  pgTable,
  uuid,
  text,
  boolean,
  integer,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const chatSessions = pgTable("chat_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  category: varchar("category", { length: 20 }).notNull().default("career"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => chatSessions.id, { onDelete: "cascade" }),
  sender: varchar("sender", { length: 20 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cvAnalyses = pgTable("cv-analyses", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  fileUrl: text("file_url"),
  score: integer("score"),
  status: varchar("status", { length: 20 }).notNull().default("processing"),
  analysis: text("analysis"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const roadMaps = pgTable("roadmaps", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  userEmail: text("user_email").notNull(),
  userInput: text("user_input").notNull(),
  roadmapData: text("roadmap_data"),
  status: varchar("status", { length: 20 }).notNull().default("processing"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const coverLetters = pgTable("coverletters", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  userEmail: text("user_email").notNull(),
  jobDescription: text("job_description").notNull(),
  content: text("content"),
  status: varchar("status", { length: 20 }).notNull().default("processing"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
