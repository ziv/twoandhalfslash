<div align="center">

<h1>//^</h1>
<i>two and a half slashes</i>
</div>


---

A [Siki](https://siki.dev) extension for annotating code with _**twoandhalfslash**_ comments.

## Usage

```shell
npm install twoandhalfslash
```

Add transformer to your Shiki config:

```javascript
import {codeToHtml} from "shiki";

const html = codeToHtml(code, {
    theme: "github-light",
    lang: "javascript",
    transformers: [
        twoandhalfslash(),
    ],
});
```

## Syntax

Twoandhalfslash comments starts with `//^` (two slashes, a caret, and a space).

## Commands

#### Banner

Replace the comment with a block element containing the content.
Add `ths-banner` class to the parent element.

Syntax: `//^ b^content`

Example:

```javascript
//^ b^content
```

#### Floating Label

Replace the comment with a floating label.

Syntax: `//^ d|u|l|r^content[^x,y]`

- Add `ths-floater-up` class to the parent element if pointing up.
- Add `ths-floater-down` class to the parent element if pointing down.
- Add `ths-floater-left` class to the parent element if pointing left.
- Add `ths-floater-right` class to the parent element if pointing right.

Example:

```javascript
const date = new Date(); //^ u^date object

const date = new Date(); //^ d^date object^10,-15
```

#### Linker

Remove the comment and add search the line for the text and wrap it in a link.

Syntax: `//^ h^text^url^label`

Example:

```javascript
const date = new Date(); //^ h^Date^https://developer.mozilla.org/.../Global_Objects/Date^MDN
```

## Styling

Add the following CSS to your project:

CDN/NPM/manual install:

// todo complete this section

```css


## More Replacers

Will be happy to get your suggestions or PRs for more cool replacers!