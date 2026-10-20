import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [tailwindcss(), tanstackStart(), nitro(), react()],
  resolve: {
    tsconfigPaths: true,
  },
});
