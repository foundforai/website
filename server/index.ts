import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

app.set('trust proxy', true);

app.get('/health', (_req, res) => {
  res.status(200).send('ok');
});

app.use((req, res, next) => {
  const host = req.get('host');

  if (app.get('env') === 'development') {
    return next();
  }

  if (
    req.path === '/health' ||
    host?.includes('localhost') ||
    req.ip === '127.0.0.1' ||
    req.ip === '::1'
  ) {
    return next();
  }

  const forwardedProto = req.get('x-forwarded-proto');
  const protocol = forwardedProto || req.protocol;

  const needsHttps = protocol !== 'https';
  const needsWwwStrip = host?.startsWith('www.');

  if (needsHttps || needsWwwStrip) {
    const canonicalHost = host ? host.replace(/^www\./, '') : 'foundforai.com';
    const canonicalUrl = `https://${canonicalHost}${req.originalUrl}`;
    return res.redirect(301, canonicalUrl);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const pathName = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (pathName.startsWith("/api")) {
      let logLine = `${req.method} ${pathName} ${res.statusCode} in ${duration}ms`;
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

  const isProduction = app.get("env") !== "development";
  const publicDir = isProduction
    ? path.resolve(import.meta.dirname, "public")
    : path.join(process.cwd(), "client", "public");

  app.get("/llms.txt", (_req, res) => {
    res.type("text/plain");
    res.sendFile(path.join(publicDir, "llms.txt"));
  });

  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain");
    res.sendFile(path.join(publicDir, "robots.txt"));
  });

  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml");
    res.sendFile(path.join(publicDir, "sitemap.xml"));
  });

  app.get("/found-for-ai-readability-playbook.pdf", (_req, res) => {
    res.type("application/pdf");
    res.sendFile(path.join(publicDir, "found-for-ai-readability-playbook.pdf"));
  });
  app.get("/a2c11531e7de47a08dfe4cb47d120610.txt", (_req, res) => {
    res.type("text/plain");
    res.sendFile(path.join(publicDir, "a2c11531e7de47a08dfe4cb47d120610.txt"));
  });

  const reportsDir = path.join(publicDir, "reports");
  app.get("/reports/:filename", (req, res, next) => {
    const filename = req.params.filename;
    if (!filename || filename.includes("..") || filename.includes("/")) {
      return res.status(404).send("Not found");
    }
    const filePath = path.join(reportsDir, filename.endsWith(".html") ? filename : `${filename}.html`);
    res.sendFile(filePath, (err) => {
      if (err) {
        next();
      }
    });
  });

  app.get("/reports", (_req, res) => {
    res.redirect(301, "/");
  });
  app.get("/reports/", (_req, res) => {
    res.redirect(301, "/");
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Server error:", err);
    res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || '3000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();