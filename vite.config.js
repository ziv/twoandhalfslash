import { defineConfig } from "vite";
import dts from "vite-plugin-dts"; // Import the plugin

export default defineConfig({
  // build: {
  //   minify: false,
  //   lib: {
  //     formats: ["es"], // Specify the formats you want to build
  //     entry: "src/lib.ts", // Your library's entry point
  //     fileName: "lib", // Output file name
  //   },
  // },
  // plugins: [dts()],
});
