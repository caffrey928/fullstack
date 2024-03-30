import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://fullstack-984qmggq6-caffrey928s-projects.vercel.app/",
        changeOrigin: true,
      },
    },
  },
});
