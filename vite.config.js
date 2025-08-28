import {defineConfig} from "vite";
import dts from 'vite-plugin-dts'; // Import the plugin

export default defineConfig({
    build: {
        lib: {
            formats: ["es"], // Specify the formats you want to build
            entry: "src/lib.ts", // Your library's entry point
            // name: "MyLibrary", // Global variable name for UMD build
            fileName: 'lib', // Output file name
        },
    },
    plugins: [dts()],
});
