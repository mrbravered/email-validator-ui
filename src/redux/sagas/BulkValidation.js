import { takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import unique from 'lodash/uniq'
import compact from 'lodash/compact'
import { UPLOADING_LIST, UPLOAD_FAILED, UPLOAD_SUCEEDED, VALIDATE_REQUESTED } from '../modules/BulkValidation'
import { validateBulk } from 'Api'
import { push } from 'react-router-redux'

function getEmailAddressesArray (state) {
  return compact(unique(state.bulkValidation.emailsList.trim().split('\n')))
}

function * validate (action) {
  const emailsArray = yield select(getEmailAddressesArray)
  yield put({type: UPLOADING_LIST})
  try {
    yield call(validateBulk, emailsArray)
    yield put({type: UPLOAD_SUCEEDED})
    yield put(push('/app/lists'))
  } catch (error) {
    yield put({type: UPLOAD_FAILED, error: error.message})
  }
}

export function * watchBulkValidate () {
  yield * takeLatest(VALIDATE_REQUESTED, validate)
}
