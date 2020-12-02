import styled from "styled-components"

export const Stack = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 5px;
  }
`
