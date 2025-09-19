import {element, text, update} from "./elements.ts";
import type {Element} from "hast";

export default function transformLink(line: Element, el: Element, args: string[]) {
    const [search, target, label = ''] = args;
    // search for the link in the line
    // replace the link with a span with the class ths-link

    for (const e of line.children) {
        if (e.type !== "element") {
            continue;
        }
        const first = e.children[0];
        if (first?.type !== "text") {
            continue;
        }
        // console.log(first);
        if (!first.value.includes(search)) {
            continue;
        }

        let parts = first.value.split(search);
        if (parts.length !== 1) {
            // somthing bad happened
            // nothing to do
        }

        update(
            e,
            [
                element("span",
                    [
                        text(parts[0]),
                    ],
                ),
                element("a",
                    [
                        text(search)
                    ],
                    {
                        href: target,
                        class: ["ths-link"],
                        title: label
                    }
                ),
                element("span",
                    [
                        text(parts[1]),
                    ],
                ),
            ]
        );
        // remove the comment
        update(el, []);
        break;
    }
}