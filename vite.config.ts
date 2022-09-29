import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  // base: process.env.APP_ENV === "development" ? "/" : "/dist/",
  // build: {
  //   outDir: "./dist",
  //   emptyOutDir: true,
  //   manifest: true,
  //   minify: "terser",
  //   rollupOptions: {
  //     input: path.resolve(__dirname, "src/main.tsx"),
  //   },
  // },
  resolve: {
    alias: [
      {
        find: "@datasets",
        replacement: path.resolve(__dirname, "src/datasets"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      { find: "@style", replacement: path.resolve(__dirname, "src/style") },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
});
