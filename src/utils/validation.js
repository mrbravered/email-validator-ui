const isEmpty = value => value === undefined || value === null || value === ''
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0]

export function email (value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid e-mail address'
  }
}

export function required (value) {
  if (isEmpty(value)) {
    return 'This field is required'
  }
}

export function minLength (min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `It should be at least ${min} characters long`
    }
  }
}

export function maxLength (max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `It should be ${max} caracteres`
    }
  }
}

export function integer (value) {
  if (!Number.isInteger(Number(value))) {
    return 'Debe ser un número entero'
  }
}

export function oneOf (enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Debe ser uno de: ${enumeration.join(', ')}`
    }
  }
}

export function match (field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'No coincide'
      }
    }
  }
}

export function createValidator (rules) {
  return (data = {}) => {
    const errors = {}
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])) // concat enables both functions and arrays of functions
      const error = rule(data[key], data)
      if (error) {
        errors[key] = error
      }
    })
    return errors
  }
}
