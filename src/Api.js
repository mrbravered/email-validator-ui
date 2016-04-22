export function validateEmail (email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (localStorage.getItem('APIKey') === 'asd') {
        resolve({
          'emailAddress': email,
          'status': ['valid', 'invalid', 'unknown'][Math.floor(Math.random() * 3)],
          'date': new Date()
        })
      } else {
        reject(new Error('Invalid APIKey. Logout and login again with a valid API Key.'))
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
