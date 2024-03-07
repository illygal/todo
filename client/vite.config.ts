import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    minify: false,
  },
  server: {
    proxy: {
      "/API": {
        target: "https://www.wikidata.org",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/API", ""),
      },
    },
  },
});
