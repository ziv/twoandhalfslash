import "./style.css";
import type {Element, ElementContent, Text} from 'hast';
import {codeToHtml} from 'shiki'
import {twoandhalfslash} from "./lib.js";

const options = {theme: 'github-light', lang: 'javascript', transformers: [twoandhalfslash()]};

/**
 * iterate over all lines that contain a `//\\` comment
 * @param node
 */
function* comments(node: Element): Generator<Element> {
    for (const line of node.children) {
        if (line.type !== 'element') {
            continue;
        }
        const child = (line.children?.[0] as Element)?.children?.[0] as Text | undefined;
        if (child && child.type === 'text' && child.value.includes('//\\')) {
            yield line;
        }
    }
}

async function main() {
    const res = await fetch('/example.code');
    const code = await res.text();
    // @ts-ignore
    const html = await codeToHtml(code, {
        theme: 'github-light',
        lang: 'javascript',
        transformers: [
            // twoandhalfslash(),
            {


                code(node: Element) {
                    console.log(node);
                    for (const comment of comments(node)) {
                        console.log(comment);
                    }
                }
            }
        ]
    });
    document.querySelector('#app').innerHTML = html;
}

main().catch(console.error);