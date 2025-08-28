import type {Element, ElementContent, Text} from "hast";

export function text(
    value: string,
): Text {
    return {
        type: "text",
        value,
    };
}

export function element(
    tagName: string,
    children: (Text | Element)[] = [],
    properties: Record<string, string | string[]> = {},
): Element {
    return {
        type: "element",
        tagName,
        properties,
        children,
    };
}

export function ellipse(width: number, height: number): Element {
    const rx = width / 2;
    const ry = height / 2;
    return element("svg",
        [
            element("ellipse", [], {
                cx: String(rx),
                cy: String(ry),
                rx: String(rx),
                ry: String(ry),
                stroke: "red",
                "stroke-width": "2",
                fill: "none",
            })
        ],
        {
            xmlns: "http://www.w3.org/2000/svg",
            width: String(width),
            height: String(height),
            viewBox: `0 0 ${width} ${height}`,
        }
    );
}

export function update(el: Element, children: ElementContent[]) {
    el.properties = {};
    el.children = children;
}
