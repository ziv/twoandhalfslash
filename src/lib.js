function number(n, defaultValue = 0) {
    return isNaN(parseFloat(n)) ? defaultValue : parseFloat(n);
}

function text(args) {
    const [x, y, text] = args;
    const span = document.createElement('span');
    span.classList.add("ths-txt");
    span.style.transform = `translateY(${y}em) translateX(${x}em)`;
    span.style.position = "absolute";
    span.innerText = text;
    return span;
}

function ellipse(args) {
    const [x, y, sw, sh, color, stroke] = args;
    const w = number(sw, 50);
    const h = number(sh, 50);
    const strokeWidth = number(stroke, 2);

    const span = document.createElement('span');
    span.classList.add("ths-ellipse");
    span.style.transform = `translateY(${y}em) translateX(${x}em)`;
    span.style.position = "absolute";

    span.innerHTML = `
<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"
     width="${w}"
     height="${h}">
     <ellipse fill="none" 
              stroke="${color}" 
              stroke-width="${strokeWidth}" 
              cx="${w / 2}" 
              cy="${h / 2}" 
              rx="${(w / 2) - strokeWidth}" 
              ry="${(h / 2) - strokeWidth}" />
</svg>
`;
    return span;
}


function addComponents(html) {
    const root = document.createElement('div');
    root.innerHTML = html;

    for (const el of root.querySelectorAll('.ths')) {

        const next = el.nextElementSibling; // next line
        if (!next || !next.classList.contains('line')) {
            continue;
        }
        next.style.position = 'relative';

        const ths = el.getAttribute('data-ths');
        if (!ths) {
            continue;
        }
        const [type, ...args] = ths.split('|');
        let span;
        switch (type) {
            case "txt":
                span = text(args);
                break;
            case "elp":
                span = ellipse(args);
                break;
        }
        if (span) {
            // insert before the first child of next line
            next.insertBefore(span, next.firstChild);
            // remove the original ths element
            el.remove();
        }
    }
    return root.innerHTML;
}

const transformer = {
    line(node, _) {
        // if (node.children.length !== 1) {
        //     return;
        // }
        const target = node.children?.[0]?.children?.[0];
        if (!target || target.type !== "text") {
            return;
        }
        if (!target.value.includes('//\\')) {
            return;
        }
        this.addClassToHast(node, 'ths')
        node.properties['data-ths'] = target.value.trim().substring(4).trim();
        target.value = ""; // make the line height 0
    },
    postprocess(html) {
        return addComponents(html);
    }
}

function twoandhalfslash() {
    return transformer;
}

export {twoandhalfslash};