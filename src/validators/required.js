const required = (hint = "cannot be blank") => value => new Promise((resolve, reject) => {
  if (value === undefined) reject(hint)
  else if (value === null) reject(hint)
  else if (value === "") reject(hint)
  else resolve(value)
})

export default required