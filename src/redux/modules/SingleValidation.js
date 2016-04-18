import { validateEmail } from 'Api'

// Constants
const UPDATE_EMAIL = 'email-validator-ui/single-validation/UPDATE_EMAIL'

const VALIDATE_REQUESTED = 'email-validator-ui/single-validation/VALIDATE_REQUESTED'
const VALIDATE_RECEIVED = 'email-validator-ui/single-validation/VALIDATE_RECEIVED'

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

// Thunk
export function validate (email) {
  return function (dispatch) {
    dispatch(requestValidation(email))
    return validateEmail(email).then((result) => {
      dispatch(receivedValidation(result.emailAddress, result.status))
    })
  }
}

// Reducer
export const initialState = {
  'isFetching': false,
  'emailAddress': '',
  'status': ''
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
    default:
      return state
  }
}