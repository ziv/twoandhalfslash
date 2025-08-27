import "./style.css";
import {codeToHtml} from 'shiki'
import {transformer, twoandhalfslash} from "./lib.js";

const options = {theme: 'nord', lang: 'javascript', transformers: [transformer]};

async function main() {
    const res = await fetch('/example.code');
    const code = await res.text();
    const html = await codeToHtml(code, options);
    document.querySelector('#app').innerHTML = twoandhalfslash(html);
}

main().catch(console.error);