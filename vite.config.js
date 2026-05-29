import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages deploys under /public-website-01; dev stays at root.
  // base: command === "build" ? "/public-website-01/" : "/",
  base: command === "build" ? "/" : "/",
}));
