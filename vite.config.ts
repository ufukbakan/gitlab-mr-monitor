import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from "dotenv";
dotenv.config();
const env = { ...process.env };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: env.BUILD_DIR || "wrong"
  }
})
