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

export function update(el: Element, children: ElementContent[]) {
    el.properties = {};
    el.children = children;
}

function ellipse(width: string, height: string, params?: string): Element {
    const p = new URLSearchParams(params ?? "stroke=black&stroke-width=2&fill=none&y=-2");

    const strokeWidth = parseInt(p.get("stroke-width") ?? "2");
    const yPos = p.get("y") ?? "-2";
    const xPos = p.get("x") ?? "0";

    const w = parseInt(width, 10);
    const h = parseInt(height, 10);
    const rx = w / 2;
    const ry = h / 2;
    return element("svg",
        [
            element("ellipse", [], {
                cx: String(rx),
                cy: String(ry),
                rx: String(rx - strokeWidth),
                ry: String(ry - strokeWidth),
                stroke: p.get("stroke") ?? "black",
                "stroke-width": p.get("stroke-width") ?? "2",
                fill: p.get("fill") ?? "none",
            })
        ],
        {
            style: `transform: translateY(${yPos}em); translateX(${xPos}em);`,
            class: ["ths-ellipse"],
            xmlns: "http://www.w3.org/2000/svg",
            width: width,
            height: height,
            viewBox: `0 0 ${width} ${height}`,
        }
    );
}


