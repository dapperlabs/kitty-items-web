import {useState, useEffect} from "react"
import styled from "styled-components"

const Root = styled.pre`
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  display: inline-block;
  align-self: center;
  font-size: inherit;
  font-family: var(--font-family);
  display: flex;
  font-weight: bold;
  color: currentColor;
`

const defaultRoll = [
  "[*     ]",
  "[ *    ]",
  "[  *   ]",
  "[   *  ]",
  "[    * ]",
  "[     *]",
  "[    * ]",
  "[   *  ]",
  "[  *   ]",
  "[ *    ]",
  "[*     ]",
]

export const Loading = ({seq = defaultRoll, label, tick}) => {
  const [i, set] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      set(state => {
        var next = state + 1
        return next >= seq.length ? 0 : next
      })
    }, tick || seq.length * 15)
    return () => clearInterval(interval)
  })
  return (
    <Root>
      {seq[i]}
      {label && " " + label}
    </Root>
  )
}
