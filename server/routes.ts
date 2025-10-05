import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { auditSubmissionSchema, contactSubmissionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);

  return httpServer;
}
