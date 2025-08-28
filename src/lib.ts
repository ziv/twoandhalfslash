import type {Element, ElementContent, Text} from "hast";
import type {ShikiTransformer} from "shiki";
import {lines} from "./iterators.ts";
import {element, text, update} from "./elements.ts";

const TWOANDHALF = /\/\/\^ \[(.+)]/;

/**
 * fetch the element that wrap the `//^` comment
 * @param node
 */
function getTwoandhalfslash(node: ElementContent): [Element, string] | null {
    if (node.type !== "element") {
        return null;
    }
    // is this the wrapper? let's check
    const comment = node.children?.[0] as Text;
    if (comment && comment.type === "text" && comment.value.includes("//^")) {
        // yap, this is the wrapper object...
        return [node, comment.value];
    }
    for (const child of node.children) {
        const ret = getTwoandhalfslash(child);
        if (ret) {
            return ret;
        }
    }
    return null;
}


export function twoandhalfslash(): ShikiTransformer {
    return {
        name: "twoandhalfs",
        code(node: Element) {
            const linesStore: Element[] = [];
            for (const line of lines(node)) {
                linesStore.push(line);
                const comment = getTwoandhalfslash(line);
                if (!comment) {
                    continue;
                }
                const match = comment[1].match(TWOANDHALF);
                if (!match) {
                    continue;
                }
                const [command, ...args] = match[1].split('^');
                // console.log(command, args);


                switch (command) {
                    case "b":
                        // banner
                        update(
                            comment[0],
                            [element('span', [text(args[0])], {class: ["ths-banner"]})]
                        );
                        break;
                    case "f":
                        const floaterPad = " ".repeat(args[0].length + 6);
                        update(
                            comment[0],
                            [
                                element("span", [text(floaterPad)]),
                                element("span", [text(args[1])], {class: ["ths-floater"]}),
                            ]
                        );
                        break;
                    case "l":
                        // search for the text in the previous lines
                        // replace the element with new link element
                        const [term, href, title] = args;
                        for (let i = linesStore.length - 2; i >= 0; i--) {
                            const line = linesStore[i];
                            for (const el of line.children) {
                                if (el.type !== "element") {
                                    continue;
                                }
                                const textEl = el.children?.[0] as Text;
                                if (!textEl || textEl.type !== "text" || !textEl.value.includes(term)) {
                                    continue;
                                }
                                // found it!
                                const parts = textEl.value.split(term, 2);
                                const before = text(parts[0]);
                                const after = text(parts[1]);
                                const linkElement = element("a", [text(term)], {
                                    href,
                                    title,
                                    target: "_blank",
                                    rel: "noopener",
                                    class: ["ths-linker"],
                                });
                                update(el, [before, linkElement, after]);
                                update(comment[0], [text('')])
                                i = -1; // break outer loop
                                break;
                            }
                        }
                        break;
                }
            }
            return node;
        },
    }
}