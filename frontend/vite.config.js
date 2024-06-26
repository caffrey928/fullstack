import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://fullstack-d34ixky4y-caffrey928s-projects.vercel.app/",
        changeOrigin: true,
      },
    },
  },
});
