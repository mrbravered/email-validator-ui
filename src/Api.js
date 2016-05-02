import 'whatwg-fetch'

const INVALID_APIKEY_MESSAGE = 'Invalid APIKey. Logout and login again with a valid API Key.'
const BASE_URL = 'http://listquality.com:3000/api/'

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error()
    if (response.status === 401) {
      error.message = INVALID_APIKEY_MESSAGE
    } else {
      error.message = response.statusText
    }
    error.response = response
    throw error
  }
}

function parseJSON (response) {
  return response.json()
}

const getToken = () => localStorage.getItem('APIKey')

export function validateEmail (email) {
  const token = getToken()
  return fetch(BASE_URL + `post?emailAddress=${email}`, {
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(checkStatus)
  .then(parseJSON)
}

export function validateBulk (emails) {
  const token = getToken()
  return fetch(BASE_URL + 'list', {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      emailAddresses: emails
    })
  })
  .then(checkStatus)
  .then(parseJSON)
}

export function getLists () {
  const token = getToken()
  return fetch(BASE_URL + 'lists/summary', {
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(checkStatus)
  .then(parseJSON)
}

export function getListPosts (listID, onProgress) {
  const token = getToken()

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `${BASE_URL}list/${listID}`, true)
    xhr.responseType = 'json'
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.onload = (e) => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject(new Error(xhr.statusText))
      }
    }

    xhr.onprogress = onProgress

    xhr.onerror = (e) => {
      reject(new Error(xhr.statusText))
    }

    xhr.send()
  })
}

window.getListPosts = getListPosts

export function authorize (token) {
  return fetch(BASE_URL + 'lists/summary', {
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then((response) => {
    if (response.status === 401) {
      return false
    } else {
      return true
    }
  })
}

window.authorize = authorize
