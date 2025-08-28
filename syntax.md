<div align="center">

# //^

</div>

<div align="center">

_~ two and a half slashes ~_

</div>

A [Siki](https://siki.dev) extension for annotating code with
_**ttwoandhalfslash**_ comments.

## Syntax

Start a comment with `//-` (two slashes, a backslash, and a space). The first
letter represent the component and the rest of the syntax is component specific.

### Labels

Starts with `l` followed by a series of `.` and 2 `^` characters marking the
start and the place of the label.

```
//-l[...]^^Label text
```

The following comment:

```ts
const date = new Date();
//\ l...........^^This is a date object
```

Will render as:

R

$\color{red}{\textsf{red text}}$
