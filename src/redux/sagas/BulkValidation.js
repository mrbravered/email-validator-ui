import { takeEvery, eventChannel, END } from 'redux-saga'
import { take, call, put } from 'redux-saga/effects'
import { UPLOADING_LIST, UPLOAD_FAILED, UPLOAD_SUCEEDED, VALIDATE_REQUESTED, UPDATE_UPLOAD_PROGRESS } from '../modules/BulkValidation'
import { validateBulk } from 'Api'
import { push } from 'react-router-redux'

function createBulkValidationChannel (emailAddresses) {
  return eventChannel((listener) => {
    function onProgress (e) {
      listener({
        type: 'progress',
        payload: e
      })
    }

    function onSuccess (data) {
      listener({
        type: 'success',
        payload: data
      })
      listener(END)
    }

    function onError (e) {
      listener({
        type: 'error',
        payload: e
      })
      listener(END)
    }

    return validateBulk(emailAddresses, onProgress, onSuccess, onError)
  })
}

function * validate (action) {
  yield put({type: UPLOADING_LIST})
  const channel = yield call(createBulkValidationChannel, action.emailAddresses)
  try {
    while (true) {
      const event = yield take(channel)
      switch (event.type) {
        case 'progress':
          console.log('Progress')
          console.log(event.payload)
          yield put({
            type: UPDATE_UPLOAD_PROGRESS,
            progress: {
              loaded: event.payload.loaded,
              total: event.payload.total
            }
          })
          break
        case 'success':
          console.log('Success!')
          yield put({type: UPLOAD_SUCEEDED})
          yield put(push('/app/lists'))
          break
        case 'error':
          console.log('Error?')
          yield put({type: UPLOAD_FAILED, error: event.payload.message})
      }
    }
  } finally {}
}

export function * watchBulkValidate () {
  yield * takeEvery(VALIDATE_REQUESTED, validate)
}
