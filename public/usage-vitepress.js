import {twoandhalfslash} from "twoandhalfslash";

export default defineConfig({
    markdown: {
        codeTransformers: [
            twoandhalfslash(), //^ add to markdown configuration^up,-6em,1.5em
        ],
    },
});
