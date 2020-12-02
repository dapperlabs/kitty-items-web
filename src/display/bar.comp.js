import styled, {css} from "styled-components"

export const Label = styled.div`
  font-size: inherit;
  line-height: 34px;

  ${p => p.strong && "font-weight: bold;"}
  ${p => p.good && "color: var(--good);"}
  ${p => p.bad && "color: var(--bad);"}
  ${p => p.muted && "color: var(--mute);"}
`

export const Button = styled.button`
  cursor: pointer;
  font-size: inherit;
  font-weight: bold;
  font-family: var(--font-family);
  line-height: 34px;
  box-sizing: border-box;
  padding: 0 21px;
  border: none;
  background: var(--wow-bg);
  color: var(--wow-fg);
  border-radius: 3px;

  ${p =>
    p.disabled
      ? css`
          opacity: 0.5;
          cursor: default;
        `
      : css`
          &:hover,
          &:focus {
            background: var(--wow-alt-bg);
            color: var(--wow-alt-fg);
          }
        `}
`

export const Bar = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 5px;
  }
`
