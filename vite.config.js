import { defineConfig } from "vite";
import { cpSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";

function copyStaticDirs() {
  return {
    name: "copy-static-dirs",
    apply: "build",
    closeBundle() {
      const out = resolve("dist");
      ["images", "music"].forEach((dir) => {
        const src = resolve(dir);
        if (existsSync(src)) {
          cpSync(src, resolve(out, dir), { recursive: true });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [copyStaticDirs()],
});
