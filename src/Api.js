const INVALID_APIKEY_MESSAGE = 'Invalid APIKey. Logout and login again with a valid API Key.'
const CONNECTION_ERROR_MESSAGE = 'There\'s seem to be a problem with your connection'

const BASE_URL = 'http://proxy.dirtynagger.com:3000/api/'

// Using real API. Untested (No CORS)
export function validateEmail (email) {
  const token = localStorage.getItem('APIKey')
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + `post?emailAddress=${email}`, {
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((r) => {
      r.json().then((data) => {
        if (data.message) {
          reject(new Error(INVALID_APIKEY_MESSAGE))
        } else {
          resolve(data)
        }
      })
    }).catch((r) => reject(new Error(CONNECTION_ERROR_MESSAGE)))
  })
}

// Mock function since is not supported by the API yet
export function validateBulk (emails) {
  const token = localStorage.getItem('APIKey')
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + 'list', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emailAddresses: emails
      })
    }).then((r) => {
      r.json().then((data) => {
        if (data.message) {
          reject(new Error(INVALID_APIKEY_MESSAGE))
        } else {
          resolve(data)
        }
      })
    }).catch((r) => {
      reject(new Error(CONNECTION_ERROR_MESSAGE))
    })
  })
}

export function getLists () {
  const token = localStorage.getItem('APIKey')
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + 'lists', {
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((r) => {
      r.json().then((data) => {
        if (data.message) {
          reject(new Error(INVALID_APIKEY_MESSAGE))
        } else {
          resolve(data)
        }
      })
    }).catch((r) => reject(new Error(CONNECTION_ERROR_MESSAGE)))
  })
}
