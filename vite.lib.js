import {defineConfig} from "vite";
import dts from "vite-plugin-dts"; // Import the plugin

export default defineConfig({
    build: {
        // emitAssets: false,
        emptyOutDir: true,
        // assetsDir: "./assets",
        lib: {
            formats: ["es"], // Specify the formats you want to build
            entry: "lib/lib.ts", // Your library's entry point
            fileName: "lib", // Output file name
        },
    },
    plugins: [dts()],
});
