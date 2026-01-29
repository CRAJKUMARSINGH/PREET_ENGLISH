import { type Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export async function setupVite(server: Server, app: Express) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, path: "/vite-hmr" },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        // Don't exit on Vite errors in development
        if (process.env.NODE_ENV === "production") {
          process.exit(1);
        }
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  // Use Vite's connect instance
  app.use(vite.middlewares);

  // Catch-all handler for SPA routing - must be last
  app.get("*", async (req, res, next) => {
    // Skip API routes
    if (req.originalUrl.startsWith("/api")) {
      return next();
    }

    const url = req.originalUrl;

    try {
      // Resolve the client template path
      const clientTemplate = path.resolve(process.cwd(), "client", "index.html");
      
      // Check if template exists
      if (!fs.existsSync(clientTemplate)) {
        throw new Error(`Template not found: ${clientTemplate}`);
      }

      // Read and transform the template
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      
      // Add cache busting for development
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      const error = e as Error;
      vite.ssrFixStacktrace(error);
      console.error("Vite SSR Error:", error.message);
      console.error("Template path:", path.resolve(process.cwd(), "client", "index.html"));
      next(error);
    }
  });
}
