import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Trust proxy - required for correct protocol detection behind load balancers/proxies
app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ============================================================================
// CANONICAL URL ENFORCEMENT - Force HTTPS and strip www subdomain
// ============================================================================
// This middleware ensures all traffic goes to https://foundforai.com
// with a single 301 redirect (no chains) for optimal SEO.
//
// Examples:
//   http://foundforai.com/           → https://foundforai.com/
//   http://www.foundforai.com/       → https://foundforai.com/
//   https://www.foundforai.com/      → https://foundforai.com/
//   https://foundforai.com/          → no redirect (canonical)
// ============================================================================
app.use((req, res, next) => {
  const host = req.get('host');
  
  // Skip ALL redirects in development environment
  if (app.get('env') === 'development') {
    return next();
  }
  
  // Production only: Check if we need to redirect
  // Use X-Forwarded-Proto header for correct protocol detection behind proxies
  const forwardedProto = req.get('x-forwarded-proto');
  const protocol = forwardedProto || req.protocol;
  
  const needsHttps = protocol !== 'https';
  const needsWwwStrip = host?.startsWith('www.');
  
  // If either condition is true, construct canonical URL and redirect
  if (needsHttps || needsWwwStrip) {
    const canonicalHost = host ? host.replace(/^www\./, '') : 'foundforai.com';
    const canonicalUrl = `https://${canonicalHost}${req.originalUrl}`;
    
    // 301 Permanent Redirect - tells Google this is the final canonical URL
    return res.redirect(301, canonicalUrl);
  }
  
  // Already canonical, continue
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
