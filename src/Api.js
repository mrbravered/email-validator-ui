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

export function validateBulk (emailAddresses, name, onProgress, onSuccess, onError) {
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

  const data = {
    emailAddresses
  }
  if (name) {
    data.name = name
  }

  xhr.send(JSON.stringify(data))

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

export function downloadList (listID, filter) {
  const token = getToken()
  let URL = `${BASE_URL}list/${listID}/download?token=${token}`

  if (filter && filter !== 'ALL') {
    const filterMap = {
      'VALID': 'valid'
    }
    URL = URL + '&status=' + filterMap[filter]
  }

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

export function login (email, password) {
  return fetch(BASE_URL + 'user/login', {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    if (response.status >= 200 && response.status < 300) {
      // Login succeded
      return response.json()
    } else if (response.status >= 400 && response.status < 500) {
      // Login failed
      return response.json().then(({ message }) => {
        throw new Error(message)
      })
    } else {
      // Something happened
      throw new Error(response.statusText)
    }
  })
}
