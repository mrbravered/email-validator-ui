import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { VALIDATE_REQUESTED, receivedValidation, failedValidation } from '../modules/SingleValidation'
import { validateEmail } from 'Api'

function * validate (action) {
  try {
    const result = yield call(validateEmail, action.email)
    yield put(receivedValidation(result.emailAddress, result.status))
  } catch (e) {
    yield put(failedValidation(e.message))
  }
}

export function * watchValidate () {
  yield * takeLatest(VALIDATE_REQUESTED, validate)
}
