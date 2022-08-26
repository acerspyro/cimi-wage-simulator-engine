import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
