import React, { createContext } from "react"

export const FormContext = createContext()

const noop = () => {}
const createFormContext = () => {
  const inputs = []
  const register = input => inputs.push(input)
  const validate = () => inputs.map(({ field, validate = noop }) => validate(field))

  return {
    inputs,
    register,
    validate,
  }
}

const Form = ({ children, ...props }) => {
  return (
    <FormContext.Provider value={createFormContext()}>
      <form {...props}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

export default Form