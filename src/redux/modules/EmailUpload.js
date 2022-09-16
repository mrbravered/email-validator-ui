// Constants
export const UPLOADING_LIST = 'email-upload/UPLOADING_LIST'
export const UPLOAD_SUCEEDED = 'email-upload/UPLOAD_SUCEEDED'
export const UPLOAD_FAILED = 'email-upload/UPLOAD_FAILED'
export const EMAIL_UPLOAD_REQUESTED = 'email-upload/EMAIL_UPLOAD_REQUESTED'
export const UPDATE_UPLOAD_PROGRESS = 'email-upload/UPDATE_UPLOAD_PROGRESS'

// Action Creators
export function upload (verifiedEmailData) {
  return {
    type: EMAIL_UPLOAD_REQUESTED,
    verifiedEmailData,
  }
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
