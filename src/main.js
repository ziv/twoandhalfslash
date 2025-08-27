import "./style.css";
import {codeToHtml} from 'shiki'
import {twoandhalfslash} from "./lib.js";

const options = {theme: 'github-light', lang: 'javascript', transformers: [twoandhalfslash]};

async function main() {
    const res = await fetch('/example.code');
    const code = await res.text();
    const html = await codeToHtml(code, options);
    document.querySelector('#app').innerHTML = html;
}

main().catch(console.error);