import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import type { IncomingMessage, ServerResponse } from "node:http";

function communityDevApi(): Plugin {
  return {
    name: "community-dev-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "";
        if (!url.startsWith("/api/community")) {
          next();
          return;
        }
        try {
          const mod = await server.ssrLoadModule(
            path.resolve(import.meta.dirname, "lib/community/http.ts"),
          );
          const body = await readJson(req);
          const host = req.headers.host || "127.0.0.1:5173";
          const result = await mod.handleCommunityRequest({
            method: req.method || "GET",
            url: `http://${host}${url}`,
            headers: req.headers,
            body,
          });
          const response = res as ServerResponse;
          response.statusCode = result.status;
          for (const [key, value] of Object.entries(result.headers as Record<string, string>)) {
            response.setHeader(key, value);
          }
          response.end(result.body == null ? "" : JSON.stringify(result.body));
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

function readJson(req: IncomingMessage): Promise<unknown> {
  if (req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS") {
    return Promise.resolve(undefined);
  }
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => {
      if (chunks.length === 0) {
        resolve(undefined);
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

export default defineConfig({
  plugins: [react(), communityDevApi()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});
