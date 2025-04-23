import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  esbuild: {
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
  optimizeDeps: {
    esbuildOptions: {
      jsxFactory: "React.createElement",
      jsxFragment: "React.Fragment",
    },
  },
  build: {
    rollupOptions: {
      // external: ["./src/**/*.svg"], // Esta línea podría estar impidiendo el procesamiento de SVGs
    },
  },
  resolve: {
    alias: {
      "*.svg": "@svgr/rollup", // Esto podría estar en conflicto con vite-plugin-svgr
    },
  },
});
