import { LOGIN } from './Auth'
// Constants
export const UPDATE_EMAIL = 'single-validation/UPDATE_EMAIL'

export const VALIDATE_REQUESTED = 'single-validation/VALIDATE_REQUESTED'
export const VALIDATE_RECEIVED = 'single-validation/VALIDATE_RECEIVED'
export const VALIDATE_FAILED = 'single-validation/VALIDATE_FAILED'

// Action Creators
export function updateEmail (emailAddress) {
  return {
    type: UPDATE_EMAIL,
    emailAddress: emailAddress
  }
}

export function requestValidation (email) {
  return {
    type: VALIDATE_REQUESTED,
    email: email
  }
}

export function receivedValidation (email, status) {
  return {
    type: VALIDATE_RECEIVED,
    email,
    status
  }
}

export function failedValidation (error) {
  return {
    type: VALIDATE_FAILED,
    error: error
  }
}

export function validate (email) {
  return requestValidation(email)
}

// Reducer
export const initialState = {
  'isFetching': false,
  'emailAddress': '',
  'status': '',
  'error': ''
}
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_EMAIL:
      return Object.assign({}, state, {
        emailAddress: action.emailAddress,
        status: ''
      })

    case VALIDATE_REQUESTED:
      return {
        'emailAddress': action.email,
        'isFetching': true
      }

    case VALIDATE_RECEIVED:
      return {
        'isFetching': false,
        'emailAddress': action.email,
        'status': action.status
      }

    case VALIDATE_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })

    case LOGIN:
      return Object.assign({}, state, {
        error: null
      })

    default:
      return state
  }
}
