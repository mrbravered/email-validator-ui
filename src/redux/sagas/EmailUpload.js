import { takeEvery, eventChannel, END } from 'redux-saga'
import { take, call, put } from 'redux-saga/effects'
import * as duck from '../modules/EmailUpload'
import { emailUpload } from 'Api'
import { push } from 'react-router-redux'

function createEmailUploadChannel (verifiedEmailData) {
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

    return emailUpload(verifiedEmailData, onProgress, onSuccess, onError)
  })
}

function * uploading (action) {
  yield put({type: duck.UPLOADING_LIST})
  const channel = yield call(createEmailUploadChannel, action.verifiedEmailData)
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
          yield put({type: duck.UPLOAD_SUCEEDED, data: event.payload})
          yield put(push(`/app/lists`))
          break
        case 'error':
          yield put({type: duck.UPLOAD_FAILED, error: event.payload.message})
      }
    }
  } finally {}
}

export function * watchEmailUpload () {
  yield * takeEvery(duck.EMAIL_UPLOAD_REQUESTED, uploading)
}
