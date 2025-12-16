import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import ninjassVitePlugin from "ninjass/vitePlugin";
import { routerPlugin } from "frwk/vitePlugins";

export default defineConfig({
  plugins: [preact(), ninjassVitePlugin(), routerPlugin()],
  base: "/kids-wishlists/",
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const match = id.match(/pages\/([^/]+)\//);
          if (match) {
            return match[1];
          }
          return;
        },
      },
    },
    outDir: "docs",
  },
  optimizeDeps: {
    exclude: ["virtual:*"],
  },
});
