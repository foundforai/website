import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { type Server } from "http";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const viteModule = await import("vite");
  const createViteServer = viteModule.createServer;
  const createLogger = viteModule.createLogger;
  const nanoidModule = await import("nanoid");
  const nanoid = nanoidModule.nanoid;

  const viteLogger = createLogger();

  const vite = await createViteServer({
    configFile: path.resolve(import.meta.dirname, "..", "vite.config.ts"),
    customLogger: {
      ...viteLogger,
      error: (msg: string, options?: any) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: true as const,
    },
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      const appHtml = render(url);
      const html = template.replace("<!--ssr-outlet-->", appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath, { index: false }));

  const ssrModulePath = path.resolve(import.meta.dirname, "server", "entry-server.js");
  let renderFn: ((url: string) => string) | null = null;

  const loadRender = async () => {
    if (!renderFn) {
      try {
        const mod = await import(ssrModulePath);
        renderFn = mod.render;
      } catch (e) {
        console.error("SSR module not found, falling back to static serving", e);
      }
    }
    return renderFn;
  };

  const templatePath = path.resolve(distPath, "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  app.use("*", async (_req, res) => {
    const render = await loadRender();
    if (render) {
      try {
        const appHtml = render(_req.originalUrl);
        const html = template.replace("<!--ssr-outlet-->", appHtml);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
        return;
      } catch (e) {
        console.error("SSR render error, falling back to static", e);
      }
    }
    res.sendFile(templatePath);
  });
}
