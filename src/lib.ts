import type {Element, ElementContent, Text} from "hast";
import type {ShikiTransformer} from "shiki";

const TWOANDHALF = /\/\/\^ (.+)/;

/**
 * fetch the element that wrap the `//^` comment
 *
 * @param node
 */
function getTwoandhalfslash(node: ElementContent): Element | null {
    if (node.type !== "element") {
        return null;
    }
    // is this the wrapper? let's check
    const comment = node.children?.[0]; // as Text;
    if (comment && comment.type === "text" && comment.value.includes("//^")) {
        // yap, this is the wrapper object...
        return node;
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
        code(root: Element) {

            for (const child of root.children) {
                const el = getTwoandhalfslash(child);
                if (!el) {
                    continue;
                }

                const comment = (el.children?.[0] as Text).value;
                const match = comment.match(TWOANDHALF);
                if (!match) {
                    continue;
                }
                const [content, args = ""] = match[1].split("^");
                const [arrow = 'left', x = '0', y = '0'] = args.split(",");

                el.properties = {};
                el.children = [
                    {
                        type: "element",
                        tagName: "span",
                        properties: {
                            class: ["ths-label", `ths-${arrow}`],
                            style: `transform: translate(${x}, ${y});`,
                        },
                        children: [
                            {
                                type: "text", value: content
                            }
                        ]
                    },
                ];
            }

            return root;
        },
    };
}
