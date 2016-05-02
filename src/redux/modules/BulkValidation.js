// Constants
export const UPDATE_EMAILS_LIST = 'bulk-validation/UPDATE_EMAILS_LIST'
export const UPLOADING_LIST = 'bulk-validation/UPLOADING_LIST'
export const UPLOAD_FAILED = 'bulk-validation/UPLOAD_FAILED'
export const UPLOAD_SUCEEDED = 'bulk-validation/UPLOAD_SUCEEDED'
export const VALIDATE_REQUESTED = 'bulk-validation/VALIDATE_REQUESTED'

// Action Creators
export function updateEmailsList (emailsList) {
  return {
    type: UPDATE_EMAILS_LIST,
    emailsList: emailsList
  }
}

// Thunk
export function validate () {
  return {type: VALIDATE_REQUESTED}
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
