import { takeEvery, eventChannel, END } from 'redux-saga'
import { take, call, put } from 'redux-saga/effects'
import * as duck from '../modules/BulkValidation'
import { validateBulk } from 'Api'
import { push } from 'react-router-redux'

function createBulkValidationChannel (emailAddresses, name) {
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

    return validateBulk(emailAddresses, name, onProgress, onSuccess, onError)
  })
}

function * validate (action) {
  yield put({type: duck.UPLOADING_LIST})
  const channel = yield call(createBulkValidationChannel, action.emailAddresses, action.name)
  try {
    while (true) {
      const event = yield take(channel)
      switch (event.type) {
        case 'progress':
          yield put({
            type: duck.UPDATE_UPLOAD_PROGRESS,
            progress: {
              loaded: event.payload.loaded,
              total: event.payload.total
            }
          })
          break
        case 'success':
          yield put({type: duck.UPLOAD_SUCEEDED})
          yield put(push('/app/lists'))
          break
        case 'error':
          yield put({type: duck.UPLOAD_FAILED, error: event.payload.message})
      }
    }
  } finally {}
}

export function * watchBulkValidate () {
  yield * takeEvery(duck.VALIDATE_REQUESTED, validate)
}
