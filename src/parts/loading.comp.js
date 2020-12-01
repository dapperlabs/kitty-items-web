import {useState, useEffect} from "react"

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

export const Loading = ({seq = defaultRoll, label}) => {
  const [i, set] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      set(state => {
        var next = state + 1
        return next >= seq.length ? 0 : next
      })
    }, seq.length * 15)
    return () => clearInterval(interval)
  })
  return (
    <pre>
      {seq[i]}
      {label && " " + label}
    </pre>
  )
}
