import { validateBulk } from 'Api'
import unique from 'lodash/uniq'
import compact from 'lodash/compact'

import { push } from 'react-router-redux'

// Constants
const UPDATE_EMAILS_LIST = 'email-validator-ui/bulk-validation/UPDATE_EMAILS_LIST'
const UPLOADING_LIST = 'bulk-validation/UPLOADING_LIST'
const UPLOAD_FAILED = 'bulk-validation/UPLOAD_FAILED'
const UPLOAD_SUCEEDED = 'bulk-validation/UPLOAD_SUCEEDED'

// Action Creators
export function updateEmailsList (emailsList) {
  return {
    type: UPDATE_EMAILS_LIST,
    emailsList: emailsList
  }
}

// Thunk
export function validate () {
  return function (dispatch, getState) {
    // Transform emailsList
    const emailsArray = compact(unique(getState().bulkValidation.emailsList.trim().split('\n')))
    dispatch({type: UPLOADING_LIST})
    return validateBulk(emailsArray).then((result) => {
      dispatch({type: UPLOAD_SUCEEDED})
      dispatch(push('/app/lists'))
    }).catch((error) => {
      dispatch({type: UPLOAD_FAILED, error: error.message})
    })
  }
}

// Reducer
export const initialState = {
  uploading: false,
  emailsList: '',
  error: ''
}
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_EMAILS_LIST:
      return {
        ...state,
        emailsList: action.emailsList
      }
    case UPLOADING_LIST:
      return {
        ...state,
        uploading: true
      }
    case UPLOAD_SUCEEDED:
      return {
        ...state,
        emailsList: '',
        uploading: false,
        error: ''
      }
    case UPLOAD_FAILED:
      return {
        ...state,
        uploading: false,
        error: action.error
      }
    default:
      return state
  }
}
