export function validateEmail (email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      'emailAddress': email,
      'status': ['valid', 'invalid'][Math.floor(Math.random() * 2)],
      'date': new Date()
    }), 1500)
  })
}

export function validateBulk (emails) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      'date': new Date(),
      'results': emails.map((email) => {
        return {
          'emailAddress': email,
          'status': ['valid', 'invalid'][Math.floor(Math.random() * 2)]
        }
      })
    }), 50)
  })
}
