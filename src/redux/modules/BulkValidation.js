import { validateBulk } from 'Api'
import unique from 'lodash/uniq'
import compact from 'lodash/compact'

import { LOGIN } from './Auth'

// Constants
const UPDATE_EMAILS_LIST = 'email-validator-ui/bulk-validation/UPDATE_EMAILS_LIST'

const VALIDATE_REQUESTED = 'email-validator-ui/bulk-validation/VALIDATE_REQUESTED'
const VALIDATE_RECEIVED = 'email-validator-ui/bulk-validation/VALIDATE_RECEIVED'
const VALIDATE_FAILED = 'email-validator-ui/bulk-validation/VALIDATE_FAILED'

// Action Creators
export function updateEmailsList (emailsList) {
  return {
    type: UPDATE_EMAILS_LIST,
    emailsList: emailsList
  }
}

export function requestValidation (emailsList) {
  return {
    type: VALIDATE_REQUESTED,
    emailsList: emailsList
  }
}

export function receivedValidation (results) {
  return {
    type: VALIDATE_RECEIVED,
    results
  }
}

export function failedValidation (error) {
  return {
    type: VALIDATE_FAILED,
    error: error
  }
}

// Thunk
export function validate () {
  return function (dispatch, getState) {
    // Transform emailsList
    const emailsArray = compact(unique(getState().bulkValidation.emailsList.trim().split('\n')))
    dispatch(requestValidation(emailsArray))
    return validateBulk(emailsArray).then((result) => {
      dispatch(receivedValidation(result.results))
    }).catch((error) => dispatch(failedValidation(error.message)))
  }
}

// Reducer
export const initialState = {
  'isFetching': false,
  'emailsList': '',
  'results': []
}
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_EMAILS_LIST:
      return Object.assign({}, state, {
        emailsList: action.emailsList
      })
    case VALIDATE_REQUESTED:
      return Object.assign({}, state, {
        isFetching: true
      })
    case VALIDATE_RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        results: action.results
      })
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
