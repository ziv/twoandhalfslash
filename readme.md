# Two And a Half Slashes

A [Siki](https://siki.dev) extension for annotating code with _**two and a half slashes**_ comments.

Without **_twoandhalfslash_**, the comments in the code:

![without twoandhalfslash](./assets/without-ths.png)

With **_twoandhalfslash_**:

![screenshot](./assets/screenshot.png)

## Installation

```shell
npm install -D shiki twoandhalfslash
```

## Usage

```ts
import {codeToHtml} from "shiki";
import {twoandhalfslash} from "twoandhalfslash";

codeToHtml(code, {
    theme: "nord",
    extensions: [twoandhalfslash()]
});
```