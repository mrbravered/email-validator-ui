import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { UPLOADING_LIST, UPLOAD_FAILED, UPLOAD_SUCEEDED, VALIDATE_REQUESTED } from '../modules/BulkValidation'
import { validateBulk } from 'Api'
import { push } from 'react-router-redux'

function * validate (action) {
  yield put({type: UPLOADING_LIST})
  try {
    yield call(validateBulk, action.emailAddresses)
    yield put({type: UPLOAD_SUCEEDED})
    yield put(push('/app/lists'))
  } catch (error) {
    yield put({type: UPLOAD_FAILED, error: error.message})
  }
}

export function * watchBulkValidate () {
  yield * takeLatest(VALIDATE_REQUESTED, validate)
}
