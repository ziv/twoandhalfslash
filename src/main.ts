import "./style.css";
import {codeToHtml} from "shiki";
import {twoandhalfslash} from "./lib.ts";

const examples = [
    {
        id: "#install",
        language: "shell",
        url: "/install.shell",
    },
    {
        id: "#shiki",
        language: "javascript",
        url: "/usage-shiki.js",
    },
    {
        id: "#vitepress",
        language: "javascript",
        url: "/usage-vitepress.js",
    },
    {
        id: "#floating-label",
        language: "go",
        url: "/example.go",
    },
    {
        id: "#vars",
        language: "css",
        url: "/styling.css",
    },
    // {
    //     id: "#link",
    //     language: "javascript",
    //     url: "/example.js",
    // }
];

async function main() {
    for (const item of examples) {
        const res = await fetch("https://ziv.github.io/twoandhalfslash" + item.url);
        const code = await res.text();
        const html = codeToHtml(code, {
            theme: "github-light",
            lang: "go",
            transformers: [
                twoandhalfslash(),
            ],
        });
        document.querySelector(item.id)!.innerHTML =
            await (html as Promise<string>);
    }
}

main().catch(console.error);
