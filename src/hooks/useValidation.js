import { useState } from "react";

const noop = () => {}
const capitalize = (string = "") => `${string[0].toUpperCase()}${string.substr(1)}`
const eventName2HandlerName = name => `on${capitalize(name)}`
const validate = (value, validators = []) =>
  Promise.all(validators.map(validator => validator(value)))

const useValidation = ({ props, ...inputApi }, {
  on: eventName = "change",
  validators = [],
  onValid = noop,
  onInvalid = noop,
}) => {
  const [hint, setHint] = useState("")
  const [validation, setValidation] = useState("prestine")
  const handlerName = eventName2HandlerName(eventName)
  const existingHandler = props[handlerName] || noop
  const existingCss = props.className || ""
  const doValidate = value => {
    validate(value, validators)
      .then(value => setValidation("valid"))
      .then(() => onValid(value))
      .then(() => setHint(""))
      .catch(hint => {
        setHint(hint)
        setValidation("invalid")
        onInvalid(value, hint)
      })
  }

  const onValidate = event => {
    existingHandler(event)
    doValidate(event.target.value)
  }

  const inputWithValidation = {
    ...props,
    className: `${existingCss} field-${validation}`,
    [handlerName]: onValidate,
  }
  
  return {
    props: inputWithValidation,
    hint,
    validate: () => doValidate(props.value),
    isValid() { return validation === "valid" },
    ...inputApi,
  }
}

export default useValidation