import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  html: text("html").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Report = typeof reports.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const auditSubmissionSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  websiteUrl: z.string().url("Valid website URL is required"),
  consent: z.boolean().refine(val => val === true, "Consent is required"),
});

export type AuditSubmission = z.infer<typeof auditSubmissionSchema>;

export const contactSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

export const readinessReportSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  url: z.string().url("Valid website URL is required"),
  priority: z.enum(["learn", "soon", "now"]),
});

export type ReadinessReportSubmission = z.infer<typeof readinessReportSubmissionSchema>;
