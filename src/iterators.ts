import type {Element, Text} from "hast";

export function* lines(el: Element): Generator<Element> {
    for (const child of el.children) {
        if (child.type !== "element") {
            continue;
        }
        // child is line
        yield child;
    }
}


export function search(term: string, root: Element): Element | null {
    // if my first child is a text node with the value, I'm the one
    if ((root.children?.[0] as Text).value === term) {
        return root;
    }
    for (const child of root.children) {
        if (child.type !== "element") {
            continue;
        }
        const ret = search(term, child);
        if (ret) {
            return ret;
        }
    }
    return null;
}