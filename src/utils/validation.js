const isEmpty = (value) => value === undefined || value === null || value === ''
const join = (rules) => (value, data) => rules.map((rule) => rule(value, data)).filter((error) => !!error)[0]

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
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters long`
    }
  }
}

export function maxLength (max) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters long`
    }
  }
}

export function integer (value) {
  if (!Number.isInteger(Number(value))) {
    return 'It must be an integer'
  }
}

export function oneOf (enumeration) {
  return (value) => {
    if (!~enumeration.indexOf(value)) {
      return `It must be one of: ${enumeration.join(', ')}`
    }
  }
}

export function match (field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Doesn\'t match'
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
