import {defineConfig} from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/lib.js', // Your library's entry point
            name: 'MyLibrary', // Global variable name for UMD build
            fileName: (format) => `twoandhalfslash.${format}.js`, // Output file name
        }
    },
});