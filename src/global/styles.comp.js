import {createGlobalStyle} from "styled-components"

export const Styles = createGlobalStyle`
  :root {
    --fg: #232323;
    --bg: #fff;
    --mute: #676767;
    --wow-bg: #6600ff;
    --wow-fg: #fff;
    --wow-alt-bg: #ff0066;
    --wow-alt-fg: #fff;
    --font-family: MonoLisa, "JetBrains Mono", "Fira Code", monospace;
    --good: green;
    --bad: tomato;
  }

  html, body {
    font-family: var(--font-family);
    font-size: 13px;
    background: var(--bg);
    color: var(--fg);
  }
`
