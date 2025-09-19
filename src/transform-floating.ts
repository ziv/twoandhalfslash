import {element, text, update} from "./elements.ts";
import type {Element} from "hast";

export default function transformFloating(el: Element, args: string[], dir: 'up' | 'down' | 'right' | 'left' = 'up') {
    const [content, options = ''] = args;

    const [x = 0, y = 0] = options.split(",");

    update(
        el,
        [
            element("span", [text(content)], {
                class: ["ths-label", `ths-${dir}`],
                style: `transform: translate(${x}, ${y});`,
            }),
        ],
    );
}