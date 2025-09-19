import { element, text, update } from "./elements.ts";
import type { Element } from "hast";

export default function transformBanner(el: Element, args: string[]) {
  const content = args[0];
  update(
    el,
    [element("span", [text(content)], { class: ["ths-banner"] })],
  );
}
