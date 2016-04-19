import { validateBulk } from 'Api'
import unique from 'lodash/uniq'
import compact from 'lodash/compact'

// Constants
const UPDATE_EMAILS_LIST = 'email-validator-ui/bulk-validation/UPDATE_EMAILS_LIST'

const VALIDATE_REQUESTED = 'email-validator-ui/bulk-validation/VALIDATE_REQUESTED'
const VALIDATE_RECEIVED = 'email-validator-ui/bulk-validation/VALIDATE_RECEIVED'

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

// Thunk
export function validate () {
  return function (dispatch, getState) {
    // Transform emailsList
    const emailsArray = compact(unique(getState().bulkValidation.emailsList.trim().split('\n')))
    dispatch(requestValidation(emailsArray))
    return validateBulk(emailsArray).then((result) => {
      dispatch(receivedValidation(result.results))
    })
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
        results: action.results
      })
    default:
      return state
  }
}
