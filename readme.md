<div align="center">

<h1>//^</h1>
<i>two and a half slash</i>
</div>

---

A [Siki](https://siki.dev) extension for annotating code with
_**twoandhalfslash**_ comments.

A tiny DSL markup for Shiki, ideal for creating code samples with floating labels.
Inspired by Ttwoslash (that inspired by fourslash test system).

#### ❦

## Usage

Install the package:

```shell
npm install twoandhalfslash
```

### Shiki

Add transformer to your Shiki config:

```javascript
import {codeToHtml} from "shiki";
import {twoandhalfslash} from "twoandhalfslash";

const html = codeToHtml(code, {
    theme: "github-light",
    lang: "javascript",
    transformers: [
        twoandhalfslash(),
    ],
});
```

### Vitepress

Add transformer to your Vitepress config:

```javascript
import {twoandhalfslash} from "twoandhalfslash";

export default defineConfig({
    markdown: {
        codeTransformers: [
            twoandhalfslash(),
        ],
    },
});
```

## Syntax

Twoandhalfslash comments starts with `//^` (two slashes, a caret, and a space).
