import type { Element, ElementContent, Text } from "hast";
import type { ShikiTransformer } from "shiki";

function text(
  value: string,
): Text {
  return {
    type: "text",
    value,
  };
}

function element(
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

function ellipse(
  width: number,
  height: number,
  strokeWidth: number,
  stroke: string,
  x: string,
  y: string,
): Element {
  const rx = width / 2;
  const ry = height / 2;
  return element("svg", [
    element("ellipse", [], {
      cx: String(rx),
      cy: String(ry),
      rx: String(rx - strokeWidth),
      ry: String(ry - strokeWidth),
      stroke: stroke,
      "stroke-width": strokeWidth + "px",
      fill: "none",
    }),
  ], {
    style: `transform: translateY(${x}); translateX(${y});`,
    class: ["ths-ellipse"],
    xmlns: "http://www.w3.org/2000/svg",
    width: width + "px",
    height: height + "px",
    viewBox: `0 0 ${width} ${height}`,
  });
}

function update(el: Element, children: ElementContent[]) {
  el.properties = {};
  el.children = children;
}

function transformFloating(
  el: Element,
  args: string[],
  dir: "up" | "down" | "right" | "left" = "up",
) {
  const [content, options = ""] = args;

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

function transformBanner(el: Element, args: string[]) {
  const content = args[0];
  update(
    el,
    [element("span", [text(content)], { class: ["ths-banner"] })],
  );
}

function transformLink(line: Element, el: Element, args: string[]) {
  const [search, target, label = ""] = args;
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
        element("span", [
          text(parts[0]),
        ]),
        element("a", [
          text(search),
        ], {
          href: target,
          class: ["ths-link"],
          title: label,
        }),
        element("span", [
          text(parts[1]),
        ]),
      ],
    );
    // remove the comment
    update(el, []);
    break;
  }
}

function transformEllipse(el: Element, args: string[]) {
  console.log({ el, args });
  ellipse(1, 2, 3, "black", "0px", "0px");
}

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
          case "e":
            transformEllipse(comment[0], args);
            break;
          case "h":
            transformLink(line, comment[0], args);
            break;
          case "b":
            transformBanner(comment[0], args);
            break;
          case "d":
            transformFloating(comment[0], args, "down");
            break;
          case "u":
            transformFloating(comment[0], args, "up");
            break;
          case "r":
            transformFloating(comment[0], args, "right");
            break;
          case "l":
            transformFloating(comment[0], args, "left");
            break;
        }
      }
      return node;
    },
  };
}
