<div align="center">

<h1>//^</h1>
<i>two and a half slash</i>
</div>

---

A [Siki](https://siki.dev) extension for annotating code with
_**twoandhalfslash**_ comments.

A tiny DSL markup for Shiki, ideal for creating code samples with rich explanations.
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

## Components

#### Floating Label

Replace the comment with a floating label.

Syntax: `//^ f^content[^params]`

Example:

```javascript
const date = new Date(); //^ u^date object

const date = new Date(); //^ d^date object^x=10px&y=-2em
```

Params:

- `x`: horizontal offset (default: 0, css units)
- `y`: vertical offset (default: 0, css units)

#### Linker

Remove the comment and convert the text into a link.

Syntax: `//^ h^text[^params]`

Example:

```javascript
const date = new Date(); //^ h^Date^link=https://developer.mozilla.org/.../Global_Objects/Date&label=MDN
```

Params:

- `url`: the URL to link to (required)
- `label`: the text to display in the link (default: the text itself)

## Styling

Add the following CSS to your project:

CDN/NPM/manual installation:

// todo complete this section

```css
#
#
More Replacers
Will be happy to get your suggestions or PRs for more cool replacers!
```

### About

It started as a joke, a bunch of scripts to enhance internal documentation code
examples, inspired by the great work of [Twoslash](https://twoslash.netlify.app/).
Some of my coworkers ask me for the scripts, so instead I created this package.

Unlike _Twoslash_, works with **any language**, run on the client as well as on
the server.

Enjoy!
