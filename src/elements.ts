import type { Element, ElementContent, Text } from "hast";

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
  children: (Text | Element)[],
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
