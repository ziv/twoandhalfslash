import type {Element, ElementContent, Text} from "hast";
import type {ShikiTransformer} from "shiki";
import transformFloating from "./transform-floating.ts";
import transformBanner from "./transform-banner.ts";
import transformLink from "./transform-link.ts";

const TWOANDHALF = /\/\/\^ (.+)/;


/**
 * fetch the element that wrap the `//^` comment
 *
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

function* lines(el: Element): Generator<Element> {
    for (const child of el.children) {
        if (child.type !== "element") {
            continue;
        }
        // child is line
        yield child;
    }
}

export function twoandhalfslash(): ShikiTransformer {
    return {
        name: "twoandhalfs",
        code(node: Element) {
            for (const line of lines(node)) {
                if (line.type !== "element") {
                    continue;
                }
                // linesStore.push(line);
                const comment = getTwoandhalfslash(line);
                if (!comment) {
                    continue;
                }
                const match = comment[1].match(TWOANDHALF);
                if (!match) {
                    continue;
                }
                const [command, ...args] = match[1].split("^");
                switch (command) {
                    case 'b':
                        transformBanner(comment[0], args);
                        break;
                    case 'd':
                        transformFloating(comment[0], args, 'down');
                        break;
                    case 'u':
                        transformFloating(comment[0], args, 'up');
                        break;
                    case 'r':
                        transformFloating(comment[0], args, 'right');
                        break;
                    case 'l':
                        transformFloating(comment[0], args, 'left');
                        break;
                    case 'h':
                        transformLink(line, comment[0], args);
                        break;
                }
            }
            return node;
        },
    };
}
