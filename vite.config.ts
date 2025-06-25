import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import mkcert from "vite-plugin-mkcert"

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [react(), mkcert()],
  server: {
    https: {
      // Using mkcert to handle certificates
    },
  },
  base: "/r3f-3d-video-player/",
})
