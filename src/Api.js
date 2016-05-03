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

export function validateBulk (emails, onProgress, onSuccess, onError) {
  const token = getToken()
  const xhr = new XMLHttpRequest()
  xhr.open('POST', BASE_URL + 'list', true)
  xhr.responseType = 'json'
  xhr.setRequestHeader('Authorization', `Bearer ${token}`)
  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.onload = (e) => {
    if (xhr.status >= 200 && xhr.status < 300) {
      onSuccess(xhr.response)
    } else {
      onError(new Error(xhr.statusText))
    }
  }

  xhr.upload.onprogress = onProgress

  xhr.onerror = (e) => onError

  xhr.send(JSON.stringify({emailAddresses: emails}))

  return () => xhr.abort()
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

export function downloadList (listID, filter) {
  const token = getToken()
  const URL = `${BASE_URL}list/${listID}/download?token=${token}`

  // We first make sure the request is valid, before triggering the download.
  fetch(URL, {
    mode: 'cors',
    method: 'HEAD'
  })
  .then(checkStatus)
  .then((response) => {
    window.location.replace(URL)
  })
}
