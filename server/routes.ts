import type { Express } from "express";
import { createServer, type Server } from "http";
import { readFileSync } from "fs";
import { join } from "path";
import { eq } from "drizzle-orm";
import { storage } from "./storage";
import { db } from "./db";
import { auditSubmissionSchema, contactSubmissionSchema, readinessReportSubmissionSchema, reports } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static readiness-report.html for SEO (200 OK with content)
  app.get("/readiness-report", (req, res) => {
    try {
      const htmlPath = join(process.cwd(), "client/public/readiness-report.html");
      const htmlContent = readFileSync(htmlPath, "utf-8");
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(htmlContent);
    } catch (error) {
      console.error("Error serving readiness-report.html:", error);
      res.status(500).send("Error loading page");
    }
  });

  // Serve static ai-visibility.html sales landing page
  app.get("/ai-visibility", (req, res) => {
    try {
      const htmlPath = join(process.cwd(), "client/public/ai-visibility.html");
      const htmlContent = readFileSync(htmlPath, "utf-8");
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(htmlContent);
    } catch (error) {
      console.error("Error serving ai-visibility.html:", error);
      res.status(500).send("Error loading page");
    }
  });

  // Serve static talk-to-a-human.html contextual sales assist page
  app.get("/talk-to-a-human", (req, res) => {
    try {
      const htmlPath = join(process.cwd(), "client/public/talk-to-a-human.html");
      const htmlContent = readFileSync(htmlPath, "utf-8");
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(htmlContent);
    } catch (error) {
      console.error("Error serving talk-to-a-human.html:", error);
      res.status(500).send("Error loading page");
    }
  });

  // Serve static fix-plan.html high-conversion page
  app.get("/fix-plan", (req, res) => {
    try {
      const htmlPath = join(process.cwd(), "client/public/fix-plan.html");
      const htmlContent = readFileSync(htmlPath, "utf-8");
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(htmlContent);
    } catch (error) {
      console.error("Error serving fix-plan.html:", error);
      res.status(500).send("Error loading page");
    }
  });

  // Serve static fix-plan-request.html form page
  app.get("/fix-plan/request", (req, res) => {
    try {
      const htmlPath = join(process.cwd(), "client/public/fix-plan-request.html");
      const htmlContent = readFileSync(htmlPath, "utf-8");
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(htmlContent);
    } catch (error) {
      console.error("Error serving fix-plan-request.html:", error);
      res.status(500).send("Error loading page");
    }
  });

  // Serve static fix-plan-thanks.html confirmation page
  app.get("/fix-plan/thanks", (req, res) => {
    try {
      const htmlPath = join(process.cwd(), "client/public/fix-plan-thanks.html");
      const htmlContent = readFileSync(htmlPath, "utf-8");
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(htmlContent);
    } catch (error) {
      console.error("Error serving fix-plan-thanks.html:", error);
      res.status(500).send("Error loading page");
    }
  });

  // Redirect /search to homepage (fixes GSC soft 404)
  app.get("/search", (req, res) => {
    res.redirect(301, "/");
  });

  app.post("/api/audit", async (req, res) => {
    try {
      const validatedData = auditSubmissionSchema.parse(req.body);
      
      const domain = new URL(validatedData.websiteUrl).hostname;
      
      // TODO: Wire to email service (SendGrid, Resend, etc.) or webhook
      console.log('=== AUDIT FORM SUBMISSION ===');
      console.log('Full Name:', validatedData.fullName);
      console.log('Email:', validatedData.email);
      console.log('Website URL:', validatedData.websiteUrl);
      console.log('Domain:', domain);
      console.log('Consent:', validatedData.consent);
      console.log('Timestamp:', new Date().toISOString());
      console.log('============================');
      
      await storage.saveAuditSubmission({
        ...validatedData,
        domain,
      });

      res.json({ 
        success: true, 
        message: 'Audit request received. You will receive your scorecard within 24 hours.' 
      });
    } catch (error: any) {
      console.error('Audit submission error:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message || 'Invalid submission data' 
      });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSubmissionSchema.parse(req.body);
      
      // TODO: Wire to email service (SendGrid, Resend, etc.) or webhook
      console.log('=== CONTACT FORM SUBMISSION ===');
      console.log('Name:', validatedData.name);
      console.log('Email:', validatedData.email);
      console.log('Message:', validatedData.message);
      console.log('Timestamp:', new Date().toISOString());
      console.log('==============================');
      
      await storage.saveContactSubmission(validatedData);

      res.json({ 
        success: true, 
        message: 'Message sent successfully. We\'ll respond within 24 hours.' 
      });
    } catch (error: any) {
      console.error('Contact submission error:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message || 'Invalid submission data' 
      });
    }
  });

  app.post("/api/readiness-report", async (req, res) => {
    try {
      const validatedData = readinessReportSubmissionSchema.parse(req.body);
      
      const domain = new URL(validatedData.url).hostname;
      
      // Compute lite score
      let score = 78;
      if (!/^https:\/\//i.test(validatedData.url)) score -= 10;
      if (/\/$/.test(validatedData.url)) score += 2;
      if (/\.(io|ai|com)$/i.test(validatedData.url)) score += 5;
      score = Math.max(0, Math.min(100, score));
      
      // TODO: Wire to email service (SendGrid, Resend, etc.) or webhook
      console.log('=== READINESS REPORT SUBMISSION ===');
      console.log('Name:', validatedData.name);
      console.log('Email:', validatedData.email);
      console.log('Website URL:', validatedData.url);
      console.log('Domain:', domain);
      console.log('Priority:', validatedData.priority);
      console.log('Computed Score:', score);
      console.log('Timestamp:', new Date().toISOString());
      console.log('===================================');
      
      await storage.saveReadinessReportSubmission({
        ...validatedData,
        domain,
        score,
      });

      res.json({ 
        success: true,
        score,
        message: 'Check complete. We\'ll email your full results and next steps.' 
      });
    } catch (error: any) {
      console.error('Readiness report submission error:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message || 'Invalid submission data' 
      });
    }
  });

  app.post("/api/publish-report", async (req, res) => {
    try {
      const apiKey = req.get("X-API-Key");
      if (!apiKey || apiKey !== process.env.REPORT_API_KEY) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const { filename, html } = req.body;
      if (!filename || typeof filename !== "string" || !html || typeof html !== "string") {
        return res.status(400).json({ success: false, message: "Missing required fields: filename (string) and html (string)" });
      }

      let slug = filename.replace(/\.html$/i, "").replace(/[\/\\\.]+/g, "").replace(/[^a-zA-Z0-9\-_]/g, "");
      if (!slug) {
        return res.status(400).json({ success: false, message: "Invalid filename" });
      }

      await db
        .insert(reports)
        .values({ slug, html })
        .onConflictDoUpdate({
          target: reports.slug,
          set: { html, createdAt: new Date() },
        });

      res.json({ success: true, url: `/reports/${slug}` });
    } catch (error: any) {
      console.error("publish-report error:", error);
      res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
