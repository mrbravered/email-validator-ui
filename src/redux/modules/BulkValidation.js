// Constants
export const UPLOADING_LIST = 'bulk-validation/UPLOADING_LIST'
export const UPLOAD_FAILED = 'bulk-validation/UPLOAD_FAILED'
export const UPLOAD_SUCEEDED = 'bulk-validation/UPLOAD_SUCEEDED'
export const VALIDATE_REQUESTED = 'bulk-validation/VALIDATE_REQUESTED'
export const UPDATE_UPLOAD_PROGRESS = 'bulk-validation/UPDATE_UPLOAD_PROGRESS'

// Action Creators
export function validate (emailsArray) {
  return {type: VALIDATE_REQUESTED, emailAddresses: emailsArray}
}

// Reducer
export const initialState = {
  uploading: false,
  error: '',
  uploadProgress: {}
}
export default function (state = initialState, action) {
  switch (action.type) {
    case UPLOADING_LIST:
      return {
        ...state,
        uploading: true
      }
    case UPDATE_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.progress
      }
    case UPLOAD_SUCEEDED:
      return {
        ...state,
        emailsList: '',
        uploading: false,
        error: '',
        uploadProgress: initialState.uploadProgress
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
