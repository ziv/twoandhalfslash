import "./style.css";
import {codeToHtml} from "shiki";
import {twoandhalfslash} from "../lib/lib.ts";

const USAGE_SHIKI = `import {codeToHtml} from "shiki";
import {twoandhalfslash} from "twoandhalfslash";

const html = codeToHtml(code, {
    theme: "github-light",
    lang: "javascript",
    transformers: [
        twoandhalfslash(), //^ add to transformers list^left,0,-.9em
    ],
});`;

const USAGE_VITEPRESS = `import {twoandhalfslash} from "twoandhalfslash";

export default defineConfig({
    markdown: {
        codeTransformers: [
            twoandhalfslash(), //^ add to markdown configuration^up,-4em,1.3em
        ],
    },
});`;

const USAGE_GO = `package main

import (
	"fmt"
	"time" //^ time package^left,.5em,-.9em
)

func main() {
	fmt.Println("Welcome to the playground!")

	fmt.Println("The time is", time.Now()) //^ time object^up,-4em,1em
}
`;

const USAGE_CSS = `:root {
    --twoandhalfslash-label-color: #595151;
    --twoandhalfslash-label-border-color: #8888;
    --twoandhalfslash-label-border-radius: 0.25em;
    --twoandhalfslash-label-shadow: 0 0 1em rgba(0, 0, 0, 0.25);
    --twoandhalfslash-label-background: antiquewhite;
    --twoandhalfslash-label-padding: 0.6em;
    --twoandhalfslash-label-z-index: 1000;
    --twoandhalfslash-label-font-family: Caveat;
}`;

const examples = [
    {
        id: "#install",
        language: "shell",
        content: `npm install twoandhalfslash`,
    },
    {
        id: "#shiki",
        language: "javascript",
        content: USAGE_SHIKI,
    },
    {
        id: "#vitepress",
        language: "javascript",
        content: USAGE_VITEPRESS,
    },
    {
        id: "#floating-label",
        language: "go",
        content: USAGE_GO,
    },
    {
        id: "#vars",
        language: "css",
        content: USAGE_CSS,
    },
];

async function main() {
    for (const item of examples) {
        const html = codeToHtml(item.content, {
            theme: "github-light",
            lang: item.language,
            transformers: [
                twoandhalfslash(),
            ],
        });
        document.querySelector(item.id)!.innerHTML =
            await (html as Promise<string>);
    }
}

main().catch(console.error);
