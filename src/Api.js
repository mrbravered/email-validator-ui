export function validateEmail (email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (localStorage.getItem('APIKey') === 'asd') {
        resolve({
          'emailAddress': email,
          'status': ['valid', 'invalid'][Math.floor(Math.random() * 2)],
          'date': new Date()
        })
      } else {
        reject(new Error('Invalid APIKey.'))
      }
    }, 1500)
  })
}

export function validateBulk (emails) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (localStorage.getItem('APIKey') === 'asd') {
        resolve({
          'date': new Date(),
          'results': emails.map((email) => {
            return {
              'emailAddress': email,
              'status': ['valid', 'invalid'][Math.floor(Math.random() * 2)]
            }
          })
        })
      } else {
        reject(new Error('Invalid APIKey.'))
      }
    }, 50)
  })
}
