import {createGlobalStyle} from "styled-components"

export const Styles = createGlobalStyle`
  :root {
    --font-family: MonoLisa, "JetBrains Mono", "Fira Code", monospace;
  }

  html, body {
    font-family: var(--font-family);
    font-size: 13px;
  }
`
