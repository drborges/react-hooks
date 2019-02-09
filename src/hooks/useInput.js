import { useState, useRef } from "react"

const useInput = (initialValue = "") => {
  const ref = useRef(null)
  const [value, setValue] = useState(initialValue)
  const onChange = event => setValue(event.target.value)
  const reset = () => setValue("")
  const focus = () => ref.current.focus()

  return {
    reset,
    focus,
    props: {
      value,
      ref,
      onChange,
    }
  }
}

export default useInput