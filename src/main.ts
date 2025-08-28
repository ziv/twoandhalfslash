import "./style.css";
import { codeToHtml } from "shiki";
import { twoandhalfslash } from "./lib.ts";

async function main() {
  const res = await fetch("/example.code");
  const code = await res.text();
  // @ts-ignore
  const html = codeToHtml(code, {
    theme: "github-light",
    lang: "javascript",
    transformers: [
      twoandhalfslash(),
    ],
  });
  document.querySelector("#app")!.innerHTML = await (html as Promise<string>);
}

main().catch(console.error);
