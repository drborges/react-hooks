import { useState } from "react";
import uuid from "uuid";

const createItem = value => ({
  value,
  id: uuid(),
})

const useList = (initialValue = []) => {
  const [values, setValues] = useState(initialValue.map(value => createItem(value)))
  const add = value => {
    setValues(values.concat(createItem(value)))
  }

  const remove = index => {
    setValues([
      ...values.slice(0, index),
      ...values.slice(index + 1),
    ])
  }

  return {
    values,
    add,
    remove,
  }
}

export default useList