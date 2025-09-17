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

Replace the comment with a block element containing the content. Add `ths-banner` class to the parent element.

```javascript
//^ b^content
```

#### Floating Label Pointing Up

Replace the comment with pointing up floating label. Add `ths-floater-up` class to the parent element.

```javascript
const date = new Date();
//^ u^0,0^content
```

#### Floating Label Pointing Down

Replace the comment with pointing up floating label. Add `ths-floater-up` class to the parent element.

```javascript
const date = new Date();
//^ d^0,0^content
```

    still in development...

### Example

The results of the above examples with CSS applied:

![Example of twoandhalfslash extension](./assets/example.png)
