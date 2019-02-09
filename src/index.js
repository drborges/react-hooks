import React, { useContext } from "react";
import ReactDOM from "react-dom";

import { Form, FormContext } from "./components"
import { required } from "./validators"

import {
  useInput,
  useList,
  useValidation,
} from "./hooks"

import "./styles.css";

const Input = ({ input }) => {
  const { register } = useContext(FormContext)
  register(input)

  return (
    <input {...input.props} />
  )
}

const Row = ({ value, onRemove }) => {
  const input = useValidation(useInput(value), {
    validators: [required()],
    onValid: value => console.log(`>>>> value ${value} is valid!`),
    onInvalid: (value, hint) => console.error(value, hint),
  })

  const { hint, validate } = input

  return (
    <div>
      <Input input={input} />
      {hint && (
        <span>{hint}</span>
      )}
      <button type="button" onClick={onRemove}>Remove</button>
      <button type="button" onClick={validate}>Validate</button>
    </div>
  )
}

const AddTodo = ({ list }) => {
  const input = useInput()
  const { validate } = useContext(FormContext)
  const handleAddTodo = () => {
    list.add(input.props.value)
    input.reset()
    input.focus()
  }

  return (
    <>
      <Input input={input} />
      <button type="button" disabled={input.props.value === ""} onClick={handleAddTodo}>Add New</button>
      <button type="button" onClick={validate}>Validate All Fields</button>
    </>
  )
}

const App = () => {
  const fruits = useList()

  return (
    <Form className="App" onSubmit={event => event.preventDefault()}>
      <AddTodo list={fruits} />

      {fruits.values.map((item, i) => (
        <Row key={item.id} value={item.value} onRemove={() => fruits.remove(i)} />
      ))}
    </Form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
