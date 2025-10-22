import { type User, type InsertUser, type AuditSubmission, type ContactSubmission, type ReadinessReportSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveAuditSubmission(submission: AuditSubmission & { domain: string }): Promise<void>;
  saveContactSubmission(submission: ContactSubmission): Promise<void>;
  saveReadinessReportSubmission(submission: ReadinessReportSubmission & { domain: string; score: number }): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private auditSubmissions: Array<AuditSubmission & { domain: string; timestamp: string }>;
  private contactSubmissions: Array<ContactSubmission & { timestamp: string }>;
  private readinessReportSubmissions: Array<ReadinessReportSubmission & { domain: string; score: number; timestamp: string }>;

  constructor() {
    this.users = new Map();
    this.auditSubmissions = [];
    this.contactSubmissions = [];
    this.readinessReportSubmissions = [];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveAuditSubmission(submission: AuditSubmission & { domain: string }): Promise<void> {
    this.auditSubmissions.push({
      ...submission,
      timestamp: new Date().toISOString(),
    });
  }

  async saveContactSubmission(submission: ContactSubmission): Promise<void> {
    this.contactSubmissions.push({
      ...submission,
      timestamp: new Date().toISOString(),
    });
  }

  async saveReadinessReportSubmission(submission: ReadinessReportSubmission & { domain: string; score: number }): Promise<void> {
    this.readinessReportSubmissions.push({
      ...submission,
      timestamp: new Date().toISOString(),
    });
  }
}

export const storage = new MemStorage();
