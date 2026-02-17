import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// server deps to bundle to reduce startup time and syscalls
const allowlist = [
    "@google/generative-ai",
    "axios",
    "connect-pg-simple",
    "cors",
    "date-fns",
    "drizzle-orm",
    "drizzle-zod",
    "express",
    "express-rate-limit",
    "express-session",
    "helmet",
    "memorystore",
    "openai",
    "passport",
    "passport-local",
    "pg",
    "postgres",
    "winston",
    "ws",
    "zod",
    "zod-validation-error",
];

async function buildAll() {
    const rootDir = path.resolve(__dirname, "..");
    const distDir = path.resolve(rootDir, "dist");
    const skipClient = process.env.SKIP_CLIENT_BUILD === "true";

    console.log("🚀 Starting Production Build...");

    // Only clear dist if not skipping client (to avoid deleting public if build:client already ran)
    if (!skipClient) {
        await rm(distDir, { recursive: true, force: true });
        console.log("📦 Building Frontend (Vite)...");
        await viteBuild({
            configFile: path.resolve(rootDir, "vite.config.ts"),
        });
    } else {
        console.log("⏭️ Skipping Frontend build (already built or requested skip).");
    }

    console.log("⚙️ Building Backend (esbuild)...");
    const pkgPath = path.resolve(rootDir, "package.json");
    const pkg = JSON.parse(await readFile(pkgPath, "utf-8"));

    const allDeps = [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
    ];

    const externals = allDeps.filter((dep) => !allowlist.includes(dep));

    // Build main server
    await esbuild({
        entryPoints: [path.resolve(rootDir, "server/index.ts")],
        platform: "node",
        bundle: true,
        format: "cjs", // CommonJS for maximum compatibility
        outfile: path.resolve(distDir, "index.cjs"),
        define: {
            "process.env.NODE_ENV": '"production"',
        },
        minify: true,
        external: externals,
        logLevel: "info",
        sourcemap: true,
    });

    // Build server API bundle for Vercel
    await esbuild({
        entryPoints: [path.resolve(rootDir, "api/index.ts")],
        platform: "node",
        bundle: true,
        format: "cjs",
        outfile: path.resolve(distDir, "api.cjs"),
        define: {
            "process.env.NODE_ENV": '"production"',
        },
        minify: true,
        external: externals,
        logLevel: "info",
    });

    console.log("✅ Build Complete! Production bundles created in /dist");
}

buildAll().catch((err) => {
    console.error("❌ Build Failed:", err);
    process.exit(1);
});
