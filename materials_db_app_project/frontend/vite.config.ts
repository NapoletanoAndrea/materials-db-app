import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        allowedHosts: [
            "612d-212-124-181-28.ngrok-free.app", // ← your ngrok URL
        ],
    },
});
