import { defineConfig } from "tsup";

// One minified file per module format; type declarations come from tsc (package.json "build").
// Minified to keep the package small; the readable source is on GitHub. keepNames keeps error class
// names readable in logs.
export default defineConfig({
    entry: { index: "src/index.ts" },
    format: ["esm", "cjs"],
    outExtension: ({ format }) => ({ js: format === "esm" ? ".mjs" : ".cjs" }),
    dts: false,
    minify: true,
    keepNames: true,
    sourcemap: false,
    treeshake: true,
    splitting: false,
    platform: "neutral",
    target: "es2020",
    clean: true,
});
