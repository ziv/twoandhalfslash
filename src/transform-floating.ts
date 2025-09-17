import {element, text, update} from "./elements.ts";
import type {Element} from "hast";

export default function transformFloating(el: Element, args: string[], dir: 'up' | 'down' = 'up') {
    const [options, content] = args;
    const [x, y] = options.split(",");

    update(
        el,
        [
            element("span", [text(content)], {
                class: ["ths-floater", `ths-${dir}`],
                style: `transform: translate(${x}px, ${y}px);`,
            }),
        ],
    );
}