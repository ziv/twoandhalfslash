<div align="center">

<h1>//^</h1>
<i>two and a half slash</i>
</div>

---

A [Siki](https://siki.dev) extension for annotating code with
_**twoandhalfslash**_ comments.

A tiny DSL markup for Shiki, ideal for creating code samples with floating labels.
Inspired by [Ttwoslash](https://twoslash.netlify.app/).

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

    //^ content[^arrow[,x[,y]]]

- `content` - the text to show in the floating label
- `arrow` - the direction the arrow is pointing to, default is left
- `x` horizontal offset in CSS units, default is 0
- `y` vertical offset in CSS units, default is 0

## Example

```go
package main

import (
	"fmt"
	"time" //^ time package^left,.5em,-.9em
)

func main() {
	fmt.Println("Welcome to the playground!")

	fmt.Println("The time is", time.Now()) //^ time object^up,-4em,1em
}

```

[See the results here](https://ziv.github.io/twoandhalfslash/).

