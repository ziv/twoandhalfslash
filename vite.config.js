import {defineConfig} from "vite";
import dts from "vite-plugin-dts"; // Import the plugin

export default defineConfig({
    base: "/twoandhalfslash/",
    tsconfig: "./tsconfig.app.json",
});
